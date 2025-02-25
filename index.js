// Import Depends
import * as fs from 'fs';
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises';
process.loadEnvFile();

try {

    // Obtain the latest json from discover.json
    let response = await fetch(`http://${process.env.LOCALIP}/discover.json`);
    let responsejson = await response.json()
    // Console log obtaining data to Acknowledge the script doing something
    console.log(`Obtaining JSON data from http://${process.env.LOCALIP}/discover.json`);
    console.log(`~~~ discover.json ~~~\n${JSON.stringify(responsejson)}\nEOF`);

    // Define a variable for the url of the xmltv data
    var xmltvurl = `https://api.hdhomerun.com/api/xmltv?DeviceAuth=${responsejson.DeviceAuth}`;

} catch (err) {

    // Console log errors and helpfull Human Readable text possible issues.
    console.log('An error occurred obtaining the DeviceAuth from your hdhomerun.');
    console.log(`The Error that occured\n"${err}"`);
    process.exit(101);

};

try {
    
    // Download the xmltv.xml file from the xmltvurl variables defined url
    let response = await fetch(xmltvurl); 
    await finished(Readable.fromWeb(response.body)
    .pipe(fs.createWriteStream(`./xmltv.xml`)));

    // Console log downloading to Acknowledge the script doing anything
    console.log(`Downloading "xmltv.xml" from ${xmltvurl}`);

} catch (err) {

    // Console log errors and helpfull Human Readable text possible issues.
    console.log('An error occurred obtaining the data from the hdhomrun api.');
    console.log('Or an error occured writing the file "./xmltv.xml".');
    console.log(`The Error that occured\n"${err}"`);
    process.exit(102);

};

// Console log Goobye message to make sure the user knows the script is done executing.
console.log('Please ensure your "xmltv.xml" file is intact and ready!');
console.log('Goodbye! ✌️');
process.exit(0);