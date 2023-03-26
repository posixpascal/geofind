const cuid = require('cuid');
const fs = require('fs/promises');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const blacklist = [
    'Antarctica', // TODO: No latlng at the moment for this :(,
    'Kosovo', // TODO: incomplete dataset
    "Mayotte", // TODO: no shape
    "Réunion", // TODO: no shape
    "Macau", // TODO: incomplete dataset
    "Cocos (Keeling) Islands", // TODO: no geometry
    "United States Minor Outlying Islands", // TODO: incomplete dataset
    "Heard Island and McDonald Islands", // TODO: incomplete dataset
    "Bouvet Island", // TODO: incomplete dataset
]

const logHead = (title) => {
    console.log('');
    console.info("---\t\t\t[" + title + "]\t\t\t---")
}
const psqlJSON = (object) => {
    return `'${JSON.stringify(object).replace(/[\u007F-\uFFFF]/g, function(chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
    }).replace(/'/g, "`")}'`
}

const psqlString = (str) => {
    return str.replace(/'/g, "`")
}

const first = (record) => record[Object.keys(record)[0]];

const seed = async () => {

    logHead("Connect Database");
    await prisma.$connect();
    console.log("✅ Database connected");

    logHead("Loading Geometry");
    const {features: geometries} = JSON.parse(await fs.readFile('./prisma/seeds/geometry.json', 'utf-8'));
    console.log("✅ Geometries loaded");

    logHead("Seeding Countries");
    const request = await fetch("https://restcountries.com/v3.1/all");
    const data = await request.json();
    console.log("🌎 Importing ", data.length, ' countries');

    for await (const country of data) {
        if (blacklist.includes(country.name.common)){
            continue;
        }

        const match = (geometries).find(({properties}) =>
            (properties.ISO_A3.toLowerCase() === country.cca3.toLowerCase()
                || properties.ISO_A2.toLowerCase() === country.cca2.toLowerCase()
                || properties.NAME_EN.toLowerCase() === country.name.common.toLowerCase()
                )
            );

        const {geometry, properties} = match ?? {
            geometry: {type: "Point", coordinates: country.latlng},
            properties: {
                WIKIDATAID: ''
            }
        };

        console.log(country.name.common)

        const query = `
            INSERT INTO "Country" (
                                   id,
                                 "altSpellings",
                                 "ariaInKm",
                                 "capitalLatLng",
                                 "capitalName",
                                 "car",
                                 "coatOfArmsPng",
                                 "coatOfArmsVector",
                                 "continent",
                                 "currencies",
                                 "flagEmoji",
                                 "isIndependent",
                                 "isUnMember",
                                 "isoAlpha2",
                                 "isoAlpha3",
                                 "isoNumeric",
                                 "languages",
                                 "latLng",
                                 "nameCommon",
                                 "nameOfficial",
                                 "nameNativeCommon",
                                 "nameNativeOfficial",
                                 "population",
                                 "region",
                                 "subregion",
                                 "timezones",
                                 "status",
                                 "tlds",
                                 "translations",
                                 "wikiDataQID",
                                 "shape",
                                 "borders",
                                   "updatedAt",
                                   "createdAt")
            VALUES (
                    '${cuid()}',
                    ${psqlJSON(country.altSpellings)},
                    ${country.area},
                    ST_GeomFromText('POINT(${country.capitalInfo.latlng[0]} ${country.capitalInfo.latlng[1]})', 4326),
                    '${psqlString(country.capital[0])}',
                    ${psqlJSON(country.car)},
                    '${country.coatOfArms?.png}',
                    '${country.coatOfArms?.svg}',
                    '${country.continents[0]}',
                    ${psqlJSON(country.currencies)},
                    '${country.flag}',
                    ${country.independent},
                    ${country.unMember},
                    '${country.cca2}',
                    '${country.cca3}',
                    '${country.ccn3}',
                    ${psqlJSON(country.languages)},
                    ST_GeomFromText('POINT(${country.latlng[0]} ${country.latlng[1]})', 4326),
                    '${psqlString(country.name.common)}',
                    '${psqlString(country.name.official)}',
                    '${psqlString(first(country.name.nativeName).common)}',
                    '${psqlString(first(country.name.nativeName).official)}',
                    ${country.population},
                    '${psqlString(country.region)}',
                    '${psqlString(country.subregion ?? country.region)}',
                    ${psqlJSON(country.timezones)},
                    '${psqlString(country.status)}',
                    ${psqlJSON(country.tld ?? [])},
                    ${psqlJSON(country.translations)},
                    '${properties.WIKIDATAID}',
                    ${psqlJSON(geometry)},
                    ${psqlJSON(country.borders ?? [])},
                    '${new Date().toISOString()}',
                    '${new Date().toISOString()}'
                    );
        `;

        //console.log(query);
        await prisma.$queryRawUnsafe(query);

        console.log("✅ ", country.name.official, '/', country.subregion, '(' + country.population + " Citizen)");
    }
    logHead("Importing Pins");
    const pins = JSON.parse(await fs.readFile("./prisma/seeds/pins.json"));
    for await (const pin of pins){
        await prisma.pin.create({
            data: {
                key: pin.key,
                hasColor: pin.hasColor,
                hasAnimation: pin.hasAnimation
            }
        });
    }

    logHead("Loading Facts");
    const factsDe = JSON.parse(await fs.readFile('./prisma/seeds/facts-de.json', 'utf-8'));
    const factsEn = JSON.parse(await fs.readFile('./prisma/seeds/facts-en.json', 'utf-8'));


    for await (const [countryCode, facts] of Object.entries(factsDe)){
        const country = await prisma.country.findFirst({
            select: {
                id: true,
            },
            where: {
                isoAlpha3: countryCode
            }
        });

        if (!country){
            console.error("Could not find matching country for code: ", countryCode);
            return;
        }

        let f = facts.length === 1 ? facts[0] : facts; // Sometimes wrapped in [].

        for await (const fact of f) {
            if (!fact.description){
                continue;
            }
            await prisma.countryFact.create({
                data: {
                    countryId: country.id,
                    description: fact.description,
                    language: 'de',
                    source: fact.source,
                    isAIGenerated: true,
                }
            });
            console.log("✅ Imported ", fact.description);
        }
    }

    for await (const [country, facts] of Object.entries(factsEn)){
        const country = await prisma.country.findFirst({
            select: {
                id: true,
            },
            where: {
                isoAlpha3: countryCode
            }
        });

        if (!country){
            console.error("Could not find matching country for code: ", countryCode);
            return;
        }

        for await (const fact of facts) {
            if (!fact.description){
                continue;
            }
            await prisma.countryFact.create({
                data: {
                    countryId: country.id,
                    description: fact.description,
                    language: 'en',
                    source: fact.source,
                    isAIGenerated: true,
                }
            });
            console.log("✅ Imported ", fact.description);
        }
    }

    logHead("Facts imported! :)")




    logHead("Loading Animals");
    const animalsDe = JSON.parse(await fs.readFile('./prisma/seeds/animals-de.json', 'utf-8'));
    const animalsEn = JSON.parse(await fs.readFile('./prisma/seeds/animals-en.json', 'utf-8'));


    for await (const [countryCode, animals] of Object.entries(animalsDe)){
        const country = await prisma.country.findFirst({
            select: {
                id: true,
            },
            where: {
                isoAlpha3: countryCode
            }
        });

        if (!country){
            console.error("Could not find matching country for code: ", countryCode);
            return;
        }

        let a = animals.length === 1 ? animals[0] : animals; // Sometimes wrapped in [].
        for await (const animal of a) {
            if (!animal.name){
                continue;
            }
            await prisma.countryAnimal.create({
                data: {
                    countryId: country.id,
                    name: animal.name,
                    description: animal.description,
                    language: 'de',
                    source: animal.source,
                    isAIGenerated: true,
                }
            });
            console.log("✅ Imported ", animal.name);
        }
    }

    for await (const [countryCode, animals] of Object.entries(animalsEn)){
        const country = await prisma.country.findFirst({
            select: {
                id: true,
            },
            where: {
                isoAlpha3: countryCode
            }
        });

        if (!country){
            console.error("Could not find matching country for code: ", countryCode);
            return;
        }

        let a = animals.length === 1 ? animals[0] : animals; // Sometimes wrapped in [].
        for await (const animal of a) {
            if (!animal.name){
                continue;
            }
            await prisma.countryAnimal.create({
                data: {
                    countryId: country.id,
                    name: animal.name,
                    description: animal.description,
                    language: 'en',
                    source: animal.source,
                    isAIGenerated: true,
                }
            });
            console.log("✅ Imported ", animal.name);
        }
    }

    logHead("Animals imported! :)")
    const achievements = JSON.parse(await fs.readFile('./prisma/seeds/achievements.json', 'utf-8'));

    for await (const achievement of achievements){
            await prisma.achievement.create({
                data: {
                    name: achievement.name,
                    experienceOnGain: achievement.experienceOnGain,
                    medal: achievement.medal,
                    type: achievement.type,
                    metadata: achievement.metadata,
                }
            });
            console.log("✅ Imported ", achievement.name);
    }

    logHead("Importing Achievements");

}


seed().then(async () => {
    await prisma.$disconnect();
    console.info("Database is ready! :)")
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
})