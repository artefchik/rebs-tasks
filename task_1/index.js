import {encoded, translations} from './data.js'


const decodeEntry = (entry) => {
    return Object.keys(entry).reduce((acc, key) => {
        if (key.endsWith('Id')) {
            const newKey = key.replace('Id', '');
            if (translations[entry[key]]) {
                acc[newKey] = translations[entry[key]];
            } else {
                acc[key] = entry[key];
            }
        } else {
            acc[key] = entry[key];
        }
        return acc;
    }, {});
}



const getUniqueIds = (entries) => {
    const uniqueIds = new Set();

    entries.forEach(entry => {
        Object.keys(entry).forEach(key => {
            if (key.endsWith('Id')) {
                uniqueIds.add(entry[key]);
            }
        });
    });

    return uniqueIds
}

const decoded = encoded.map(decodeEntry);

const uniqueIds = getUniqueIds(encoded)
//
// console.log("Let's rock")
// console.log(encoded, translations)

console.log(decoded)
console.log(uniqueIds)
