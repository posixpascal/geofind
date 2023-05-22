// Use chatgpt to collect facts about countries in various languages
import dotenv from 'dotenv';
// @ts-ignore
import {ChatGPTClient} from '@waylaidwanderer/chatgpt-api';
// @ts-ignore
import jsonic from 'jsonic';
import {prisma} from "@/server/prisma";
import fs from 'fs';

dotenv.config();

const languages = [{
    key: 'de',
    gpt: "Deutsch"
}, {
    key: 'en',
    gpt: "English"
}];

const clientOptions = {
    modelOptions: {
        model: 'gpt-3.5-turbo',
        max_tokens: 3000
    },
    debug: false
}

const amountFacts = 4;
const amountPeople = 2;
const amountAnimals = 2;

const cacheOptions = {};

const chatGpt = new ChatGPTClient(process.env.OPENAI_KEY, clientOptions, cacheOptions);

const question = (countryName: string, language: string) => {
    if (language === 'English') {
        return `Give me ${amountFacts} facts about the country "${countryName}" as a JSON array. Each item in the array should contain a description property which describes the thing, and a source property which is a URL to the wikipedia source. Put the JSON in tripple backticks.`
    }

    if (language === 'Deutsch'){
        return `Gib mir ${amountFacts} Fakten über das Land "${countryName}" als eine JSON Liste. Bitte ein Attribut namens "description" einführen welches jedes Ding beschreibt und ein Attribut namens "wikipedia" mit einem Direktlink zum Wikipedia Artikel. Die Werte der JSON Attribute müssen Deutsch sein. JSON bitte in Tripple Backticks (\`\`\`) schreiben`
    }
}

let tokensConsumed = 0;

const populateFacts = async () => {
    for await (const language of languages) {
        const facts = JSON.parse(fs.readFileSync(`./data/facts-${language.key}.json`, 'utf-8'));
        const country = await prisma.country.findFirst({
            select: {
                id: true,
                nameCommon: true,
                isoAlpha3: true,
            },
            skip: Object.keys(facts).length,
            take: 1
        });

        if (!country) {
            console.log("We've reached the end. :)");
            continue;
        }

        const {response, details: {usage}} = await chatGpt.sendMessage(question(country.nameCommon, language.gpt), {
            onProgress: (token: string) => process.stdout.write(token),
        });

        const jsonData = response.replace('```JSON', '```')
            .replace('```json', '```')
            .split('```')[1]
            .split('```')[0];

        console.log(jsonData);

        const factsJSON = jsonic(jsonData);

        // sometimes we get an object instead of an array
        facts[country.isoAlpha3] = !factsJSON.length ? Object.values(factsJSON) : factsJSON;

        await fs.writeFileSync(`./data/facts-${language.key}.json`, JSON.stringify(facts, null, 4), 'utf-8');
        console.info("Received: ", factsJSON.length, ' facts about ', country.nameCommon);
    }
    populateFacts();
}

prisma.$connect().then(() => {
    console.info("Connected to Prisma");
    populateFacts();
});
