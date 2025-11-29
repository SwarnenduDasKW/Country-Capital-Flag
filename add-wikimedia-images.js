const fs = require('fs');

// Wikimedia Commons images for countries (curated list of landmarks/iconic images)
const wikimediaImages = {
    'ALA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Flag_of_%C3%85land.svg/800px-Flag_of_%C3%85land.svg.png',
    'ATA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Antarctica_6400px_from_Blue_Marble.jpg/800px-Antarctica_6400px_from_Blue_Marble.jpg',
    'ABW': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Aruba_Natural_Bridge.jpg/800px-Aruba_Natural_Bridge.jpg',
    'BHR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bahrain_World_Trade_Center.jpg/800px-Bahrain_World_Trade_Center.jpg',
    'BEL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brussels_Grand_Place_Grote_Markt.jpg/800px-Brussels_Grand_Place_Grote_Markt.jpg',
    'BEN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ganvie1.jpg/800px-Ganvie1.jpg',
    'BTN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Taktsang_edit.jpg/800px-Taktsang_edit.jpg',
    'BIH': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Mostar_Old_Town_Panorama_2007.jpg/800px-Mostar_Old_Town_Panorama_2007.jpg',
    'BWA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Okavango_Delta.jpg/800px-Okavango_Delta.jpg',
    'BRA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg',
    'BRN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Omar_Ali_Saifuddin_Mosque_02.jpg/800px-Omar_Ali_Saifuddin_Mosque_02.jpg',
    'BGR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Alexander_Nevsky_Cathedral_Sofia_2012.jpg/800px-Alexander_Nevsky_Cathedral_Sofia_2012.jpg',
    'BFA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ouagadougou_vue_aerienne.jpg/800px-Ouagadougou_vue_aerienne.jpg',
    'BDI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bujumbura_from_Tanganyika.jpg/800px-Bujumbura_from_Tanganyika.jpg',
    'CAF': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Bangui_-_Marche_Central.jpg/800px-Bangui_-_Marche_Central.jpg',
    'CHL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Torres_del_Paine_-_Macizo_Paine.jpg/800px-Torres_del_Paine_-_Macizo_Paine.jpg',
    'COL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cartagena%2C_Colombia.jpg/800px-Cartagena%2C_Colombia.jpg',
    'COD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Kinshasa_-_Gombe.jpg/800px-Kinshasa_-_Gombe.jpg',
    'CUB': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Havana_-_Cuba_-_0368.jpg/800px-Havana_-_Cuba_-_0368.jpg',
    'CZE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Prague_panorama.jpg/800px-Prague_panorama.jpg',
    'DNK': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Copenhagen_from_the_air.jpg/800px-Copenhagen_from_the_air.jpg',
    'DJI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Djibouti_City.jpg/800px-Djibouti_City.jpg',
    'ECU': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Quito_Old_Town.jpg/800px-Quito_Old_Town.jpg',
    'SLV': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/San_Salvador_Volcano.jpg/800px-San_Salvador_Volcano.jpg',
    'ERI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Asmara_-_Panorama.jpg/800px-Asmara_-_Panorama.jpg',
    'ETH': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Simien_Mountains_22.jpg/800px-Simien_Mountains_22.jpg',
    'FIN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Helsinki_Cathedral_in_July_2004.jpg/800px-Helsinki_Cathedral_in_July_2004.jpg',
    'DEU': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Brandenburger_Tor_abends.jpg/800px-Brandenburger_Tor_abends.jpg',
    'GRC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/800px-The_Parthenon_in_Athens.jpg',
    'GRL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Greenland_scenery.jpg/800px-Greenland_scenery.jpg',
    'GRD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/St._George%27s%2C_Grenada_01.jpg/800px-St._George%27s%2C_Grenada_01.jpg',
    'GTM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tikal_mayan_ruins_2009.jpg/800px-Tikal_mayan_ruins_2009.jpg',
    'GIN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Conakry_overview.jpg/800px-Conakry_overview.jpg',
    'GUY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kaieteur_Falls%2C_Guyana.jpg/800px-Kaieteur_Falls%2C_Guyana.jpg',
    'HND': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Copan_ruins.jpg/800px-Copan_ruins.jpg',
    'HKG': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg/800px-Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg',
    'HUN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Budapest_Parliament.jpg/800px-Budapest_Parliament.jpg',
    'ISL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Hallgr%C3%ADmskirkja%2C_Reykjav%C3%ADk%2C_Iceland.jpg/800px-Hallgr%C3%ADmskirkja%2C_Reykjav%C3%ADk%2C_Iceland.jpg',
    'CIV': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Abidjan_Plateau.jpg/800px-Abidjan_Plateau.jpg',
    'IRN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Shah_Mosque_Esfahan.jpg/800px-Shah_Mosque_Esfahan.jpg',
    'IRL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Cliffs_of_Moher_2.jpg/800px-Cliffs_of_Moher_2.jpg',
    'JAM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dunn%27s_River_Falls%2C_Jamaica.jpg/800px-Dunn%27s_River_Falls%2C_Jamaica.jpg',
    'KEN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nairobi_Skyline.jpg/800px-Nairobi_Skyline.jpg',
    'KWT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Kuwait_Towers.jpg/800px-Kuwait_Towers.jpg',
    'KGZ': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Issyk_Kul_Lake.jpg/800px-Issyk_Kul_Lake.jpg',
    'LAO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pha_That_Luang%2C_Vientiane%2C_Laos.jpg/800px-Pha_That_Luang%2C_Vientiane%2C_Laos.jpg',
    'LBN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Baalbek_Bacchus_Temple.jpg/800px-Baalbek_Bacchus_Temple.jpg',
    'LSO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lesotho_Highlands.jpg/800px-Lesotho_Highlands.jpg',
    'LBY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Leptis_Magna_Arch_of_Septimus_Severus.jpg/800px-Leptis_Magna_Arch_of_Septimus_Severus.jpg',
    'LIE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Vaduz_Castle.jpg/800px-Vaduz_Castle.jpg',
    'LTU': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Vilnius_Old_Town.jpg/800px-Vilnius_Old_Town.jpg',
    'LUX': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Luxembourg_Ville_Haute.jpg/800px-Luxembourg_Ville_Haute.jpg',
    'MDG': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Avenue_of_the_Baobabs_01.jpg/800px-Avenue_of_the_Baobabs_01.jpg',
    'MWI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Lake_Malawi.jpg/800px-Lake_Malawi.jpg',
    'MYS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Petronas_Panorama_II.jpg/800px-Petronas_Panorama_II.jpg',
    'MLI': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Great_Mosque_of_Djenne_1.jpg/800px-Great_Mosque_of_Djenne_1.jpg',
    'MLT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Valletta_skyline.jpg/800px-Valletta_skyline.jpg',
    'MUS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Le_Morne_Brabant.jpg/800px-Le_Morne_Brabant.jpg',
    'MEX': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Chichen_Itza_3.jpg/800px-Chichen_Itza_3.jpg',
    'MDA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Chisinau_Cathedral.jpg/800px-Chisinau_Cathedral.jpg',
    'MCO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Monte_Carlo_Casino.jpg/800px-Monte_Carlo_Casino.jpg',
    'MNE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Kotor_Montenegro.jpg/800px-Kotor_Montenegro.jpg',
    'MAR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Hassan_II_Mosque%2C_Casablanca.jpg/800px-Hassan_II_Mosque%2C_Casablanca.jpg',
    'MOZ': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Maputo_Bay.jpg/800px-Maputo_Bay.jpg',
    'MMR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bagan%2C_Myanmar.jpg/800px-Bagan%2C_Myanmar.jpg',
    'NAM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sossusvlei.jpg/800px-Sossusvlei.jpg',
    'NLD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Amsterdam_Canals_-_July_2006.jpg/800px-Amsterdam_Canals_-_July_2006.jpg',
    'NIC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Managua_Cathedral.jpg/800px-Managua_Cathedral.jpg',
    'NGA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Lagos_Island.jpg/800px-Lagos_Island.jpg',
    'PRK': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Pyongyang_Skyline.jpg/800px-Pyongyang_Skyline.jpg',
    'NOR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Geirangerfjord.jpg/800px-Geirangerfjord.jpg',
    'PAN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Panama_Canal_Gatun_Locks.jpg/800px-Panama_Canal_Gatun_Locks.jpg',
    'PNG': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Port_Moresby_Harbour.jpg/800px-Port_Moresby_Harbour.jpg',
    'PRY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Asuncion_Paraguay.jpg/800px-Asuncion_Paraguay.jpg',
    'PER': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg',
    'PHL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Chocolate_Hills_overview.jpg/800px-Chocolate_Hills_overview.jpg',
    'POL': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Krak%C3%B3w_-_Rynek_G%C5%82%C3%B3wny.jpg/800px-Krak%C3%B3w_-_Rynek_G%C5%82%C3%B3wny.jpg',
    'PRT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Lisbon_-_Bel%C3%A9m_Tower.jpg/800px-Lisbon_-_Bel%C3%A9m_Tower.jpg',
    'QAT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Doha_Skyline.jpg/800px-Doha_Skyline.jpg',
    'ROU': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Bran_Castle.jpg/800px-Bran_Castle.jpg',
    'RUS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Moscow_July_2011-7a.jpg/800px-Moscow_July_2011-7a.jpg',
    'RWA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Kigali_City_Tower.jpg/800px-Kigali_City_Tower.jpg',
    'KNA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Basseterre_St_Kitts.jpg/800px-Basseterre_St_Kitts.jpg',
    'LCA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Pitons_St_Lucia.jpg/800px-Pitons_St_Lucia.jpg',
    'VCT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kingstown_St_Vincent.jpg/800px-Kingstown_St_Vincent.jpg',
    'WSM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Apia_Samoa.jpg/800px-Apia_Samoa.jpg',
    'SMR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/San_Marino_Guaita_Tower.jpg/800px-San_Marino_Guaita_Tower.jpg',
    'STP': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sao_Tome_Pico_Cao_Grande.jpg/800px-Sao_Tome_Pico_Cao_Grande.jpg',
    'SAU': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Masjid_Haram_Panorama.jpg/800px-Masjid_Haram_Panorama.jpg',
    'SEN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dakar_Skyline.jpg/800px-Dakar_Skyline.jpg',
    'SYC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Anse_Source_d%27Argent_2-La_Digue.jpg/800px-Anse_Source_d%27Argent_2-La_Digue.jpg',
    'SLE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Freetown_Sierra_Leone.jpg/800px-Freetown_Sierra_Leone.jpg',
    'SGP': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Marina_Bay_Sands_in_the_evening_-_20101120.jpg/800px-Marina_Bay_Sands_in_the_evening_-_20101120.jpg',
    'SVK': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Bratislava_Castle_at_Night.jpg/800px-Bratislava_Castle_at_Night.jpg',
    'SVN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lake_Bled_from_Ojstrica.jpg/800px-Lake_Bled_from_Ojstrica.jpg',
    'SOM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Mogadishu_Cathedral.jpg/800px-Mogadishu_Cathedral.jpg',
    'ZAF': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Table_Mountain_DanieVDM.jpg/800px-Table_Mountain_DanieVDM.jpg',
    'KOR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Seoul-Skyline-2019.jpg/800px-Seoul-Skyline-2019.jpg',
    'SSD': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Juba_South_Sudan.jpg/800px-Juba_South_Sudan.jpg',
    'ESP': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sagrada_Familia_01.jpg/800px-Sagrada_Familia_01.jpg',
    'LKA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Sigiriya_Rock.jpg/800px-Sigiriya_Rock.jpg',
    'SUR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paramaribo_Waterfront.jpg/800px-Paramaribo_Waterfront.jpg',
    'SWE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Stockholm_Palace.jpg/800px-Stockholm_Palace.jpg',
    'CHE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Matterhorn_from_Domh%C3%BCtte_-_2.jpg/800px-Matterhorn_from_Domh%C3%BCtte_-_2.jpg',
    'TWN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Taipei_101_from_afar.jpg/800px-Taipei_101_from_afar.jpg',
    'TZA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Mount_Kilimanjaro.jpg/800px-Mount_Kilimanjaro.jpg',
    'THA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Wat_Arun_Bangkok.jpg/800px-Wat_Arun_Bangkok.jpg',
    'TLS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Dili_East_Timor.jpg/800px-Dili_East_Timor.jpg',
    'TON': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nuku%27alofa_Tonga.jpg/800px-Nuku%27alofa_Tonga.jpg',
    'TTO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Port_of_Spain_Trinidad.jpg/800px-Port_of_Spain_Trinidad.jpg',
    'TUN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Sidi_Bou_Said_Tunisia.jpg/800px-Sidi_Bou_Said_Tunisia.jpg',
    'TUR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg',
    'TKM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ashgabat_Turkmenistan.jpg/800px-Ashgabat_Turkmenistan.jpg',
    'UGA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Kampala_City_Centre.jpg/800px-Kampala_City_Centre.jpg',
    'UKR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kyiv_Pechersk_Lavra_2006.jpg/800px-Kyiv_Pechersk_Lavra_2006.jpg',
    'ARE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burj_Khalifa.jpg/800px-Burj_Khalifa.jpg',
    'GBR': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/800px-London_Skyline_%28125508655%29.jpeg',
    'URY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Montevideo_Rambla.jpg/800px-Montevideo_Rambla.jpg',
    'VEN': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Angel_Falls_in_Venezuela.jpg/800px-Angel_Falls_in_Venezuela.jpg',
    'VNM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ha_Long_Bay.jpg/800px-Ha_Long_Bay.jpg',
    'YEM': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sana%27a_Yemen.jpg/800px-Sana%27a_Yemen.jpg',
    'ZMB': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Victoria_Falls.jpg/800px-Victoria_Falls.jpg',
    'ZWE': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Great_Zimbabwe_Ruins.jpg/800px-Great_Zimbabwe_Ruins.jpg'
};

// Read existing CountryCover
const countryCover = JSON.parse(fs.readFileSync('src/data/CountryCover.json', 'utf8'));
const existingCodes = new Set(countryCover.map(c => c.alpha3Code));

// Add new entries for missing countries
const newEntries = [];
Object.keys(wikimediaImages).forEach(code => {
    if (!existingCodes.has(code)) {
        newEntries.push({
            alpha3Code: code,
            imgsrc: wikimediaImages[code]
        });
    }
});

// Merge and sort
const updatedCover = [...countryCover, ...newEntries].sort((a, b) =>
    a.alpha3Code.localeCompare(b.alpha3Code)
);

// Write back
fs.writeFileSync('src/data/CountryCover.json', JSON.stringify(updatedCover, null, 2));

console.log(`Added ${newEntries.length} new country images!`);
console.log(`Total countries with images: ${updatedCover.length}`);
