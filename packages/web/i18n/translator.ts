const translate = require('@iamtraction/google-translate');
const base: any = require('./base').default;
const fs = require('fs');

const main = async () => {
  const targets = ['en', 'es', 'fr', 'it', 'jp', 'nl'];
  const translated = {};

  const translateBlock = async (node, locale) => {
    if (typeof node === 'string') {
      const res = (await translate(node, {from: 'de', to: locale}));
      return res.text;
    }

    const result = {};
    for await (const key of Object.keys(node)) {
      result[key] = (await translateBlock(node[key], locale));
    }
    return result;
  }

  for await (const target of targets) {
    translated[target] = {}
    // @ts-ignore
    for await (const key of Object.keys(base)) {
      translated[target][key] = await translateBlock(base[key], target);
      console.log(translated[target][key]);
    }

    fs.writeFileSync('translations/' + target + '.json', JSON.stringify(translated[target], null, 4));
    console.log('Translated into: ', target);
  }
}

main();
