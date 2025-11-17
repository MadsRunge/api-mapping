// Example of using the SparEnergi.dk API with JavaScript (Node.js)

const fetch = require('node-fetch');
const fs = require('fs');

async function runExamples() {
    // 1. Address Autocomplete
    console.log('--- Address Autocomplete ---');
    const autocompleteResponse = await fetch('https://sparenergi.dk/address/autocomplete?q=R%C3%A5dhuspladsen%201');
    const autocompleteData = await autocompleteResponse.json();
    console.log(autocompleteData);
    console.log('\n');

    // 2. Get Building Image
    // Note: You need an EnergyLabelSerialIdentifier for this to work.
    // We'll use the one we discovered: 311243218
    console.log('--- Get Building Image ---');
    const imageResponse = await fetch('https://emoweb.dk/EMODigital/EMODigital.svc/Picture/311243218');
    const imageBuffer = await imageResponse.buffer();
    fs.writeFileSync('building_image.jpg', imageBuffer);
    console.log('Image saved to building_image.jpg');
    console.log('\n');

    // 3. Get PDF Report
    // Note: You need an EnergyLabelSerialIdentifier for this to work.
    console.log('--- Get PDF Report ---');
    const pdfResponse = await fetch('https://emoweb.dk/getcompcon/api/Data/GetPDFToBrowser?EnergyLabelSerialIdentifier=311243218');
    const pdfBuffer = await pdfResponse.buffer();
    fs.writeFileSync('energy_report.pdf', pdfBuffer);
    console.log('PDF report saved to energy_report.pdf');
    console.log('\n');
}

runExamples();
