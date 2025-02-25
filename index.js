// Import Depends
import * as fs from 'fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

// Import .env file variables
function getBoolean(str) {
    if (str === "true") { return true; }; return false;
};
process.loadEnvFile();
const dest = process.env.DEST;
const output = getBoolean(process.env.CONSOLE_OUTPUT);

try {

        // Obtain the latest json from discover.json
        let response = await fetch(`http://${process.env.LOCAL_IP}/discover.json`);
        let responsejson = await response.json();

        // Only console log additional info if it is set in .env
        if (output) {
                // Console log obtaining data to Acknowledge the script doing something
                console.log(`Obtaining JSON data from http://${process.env.LOCAL_IP}/discover.json`);
                console.log(`~~~ discover.json ~~~\n${JSON.stringify(responsejson)}\nEOF`);
        };

        // Define a variable for the url of the xmltv data
        var xmltvurl = `https://api.hdhomerun.com/api/xmltv?DeviceAuth=${responsejson.DeviceAuth}`;

} catch (err) {

        // Console log errors and helpful human-readable text possible issues.
        console.log('An error occurred obtaining the DeviceAuth from your HDHomeRun.');
        console.log(`The Error that occured\n"${err}"`);
        process.exit(0);

};

try {

        // Download the xmltv.xml file from the xmltvurl variables defined url
        let response = await fetch(xmltvurl);
        await finished(Readable.fromWeb(response.body)
                .pipe(fs.createWriteStream(dest)));

        // Only console log additional info if it is set in .env
        if (output) {
                // Console log downloading to Acknowledge the script doing anything
                console.log(`Downloading "xmltv.xml" from ${xmltvurl}`);
        };

} catch (err) {

        // Console log errors and helpful human-readable text possible issues.
        console.log('An error occurred obtaining the data from the HDHomeRun api.');
        console.log('Or an error occurred writing the file "./xmltv.xml".');
        console.log(`The Error that occured\n"${err}"`);
        process.exit(0);

};

// Only console log additional info if it is set in .env
if (output) {
        // Console log Goodbye message to make sure the user knows the script is done executing.
        console.log('Please ensure your "xmltv.xml" file is intact and ready!');
        console.log('Goodbye! ✌️');
        process.exit(0);
};
