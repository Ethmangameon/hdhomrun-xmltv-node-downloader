// Import Depends
import dotenv from "dotenv"
import * as fs from 'fs';
import * as stream from 'stream';
import axios from 'axios';
import { promisify } from 'util';
dotenv.config();

try {

    // Obtain the latest json from discover.json
    let response = await axios({
        method: 'GET',
        url: `http://${process.env.LOCALIP}/discover.json`
    });

    // Define a variable for the url of the xmltv data
    var xmltvurl = `https://api.hdhomerun.com/api/xmltv?DeviceAuth=${response.data.DeviceAuth}`

} catch (err) {

    // Console log errors and helpfull Human Readable text possible issues.
    console.log('An error occurred obtaining the DeviceAuth from your hdhomerun.');
    console.log(`The Error that occured\n"${err}"`);
    process.exit(101);

};

try {
  
    // Define what to do with the final data
    let finishedDownload = promisify(stream.finished);
    let writer = fs.createWriteStream('./xmltv.xml');

    // Define the request that will be made to api.hdhomerun.com
    let responsestream = await axios({
        method: 'GET',
        url: xmltvurl,
        responseType: 'stream',
    });

    // Console log downloading to Acknowledge the script doing anything
    console.log(`Downloading "xmltv.xml" from ${xmltvurl}`);
    
    // Take response and write it to file
    responsestream.data.pipe(writer);
    await finishedDownload(writer);

} catch (err) {

    // Console log errors and helpfull Human Readable text possible issues.
    console.log('An error occurred obtaining the data from the hdhomrun api.');
    console.log('Or an error occured writing the file "./xmltv.xml".');
    console.log(`The Error that occured\n"${err}"`);
    process.exit(102);

};

// Console log Goobye message to make sure the user knows the script is done executing.
console.log('Please ensure your "xmltv.xml" file is intact and ready!')
console.log('Goodbye! ✌️')
process.exit(0);