const https = require('https');

const url = "https://restcountries.com/v3.1/name/can?fields=name,capital,cca3";

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const countries = JSON.parse(data);
            console.log(`Found ${countries.length} countries:`);
            countries.forEach(c => {
                console.log(`- ${c.name.common} (Official: ${c.name.official})`);
            });
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (err) => {
    console.error("Error: " + err.message);
});
