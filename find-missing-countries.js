const fs = require('fs');

// Read the files
const allCountries = JSON.parse(fs.readFileSync('src/data/AllCountriesLight.json', 'utf8'));
const countryCover = JSON.parse(fs.readFileSync('src/data/CountryCover.json', 'utf8'));

// Get existing alpha3 codes in CountryCover
const existingCodes = new Set(countryCover.map(c => c.alpha3Code));

// Find missing countries
const missingCountries = allCountries
    .filter(country => !existingCodes.has(country.alpha3Code))
    .map(country => ({
        alpha3Code: country.alpha3Code,
        name: country.name
    }));

console.log(`Total countries: ${allCountries.length}`);
console.log(`Countries with images: ${existingCodes.size}`);
console.log(`Missing countries: ${missingCountries.length}`);
console.log('\nMissing countries:');
missingCountries.forEach(c => console.log(`${c.alpha3Code}: ${c.name}`));

// Save missing countries to a file for reference
fs.writeFileSync('missing-countries.json', JSON.stringify(missingCountries, null, 2));
console.log('\nSaved missing countries to missing-countries.json');
