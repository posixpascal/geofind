const fs = require('fs');
const axios = require('axios');
const base = require('./base.js');
let fails = [];
const enhance = (c) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${c.country_code.toLowerCase()}`).then((res) => {
            console.log('Fetched: ', c.name);
            resolve(res.data);
        }).catch(e => {
            fails.push(c.name);
            console.log("Failed to fetch: ", c.name);
        });
    });
}

Promise.all(base.map(enhance)).then(enhanced => {
    fs.writeFileSync("enhanced.json", JSON.stringify(enhanced));
    console.log('Written enhanced countries');
    console.log('Failed: ', fails.length);
    console.log(fails);
});

