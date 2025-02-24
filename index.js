// Import JSON objects from discover.json
// Import fs for final output
import { createRequire } from "module";
import dotenv from "dotenv"
const require = createRequire(import.meta.url);
const wget = require('node-wget');
import * as fs from 'fs';
import * as stream from 'stream';
import axios from 'axios';
import { promisify } from 'util';
dotenv.config();

const timeout = Number(process.env.TIMEOUT)

// Obtain the latest discover.json
wget({
    url:  `http://${process.env.LOCALIP}/discover.json`,     
    dest: './',
    timeout: timeout       
});

// Set an timeout/sleep to make sure discover.json is the latest 
setTimeout(async function(){
    // Import the new discover.json
    let discoverjson = require('./discover.json');
    // Define a variable for the url of the xmltv data
    let xmltvurl = `https://api.hdhomerun.com/api/xmltv?DeviceAuth=${await discoverjson.DeviceAuth}`
    // Define what to do with the data
    let finishedDownload = promisify(stream.finished);
    let writer = fs.createWriteStream('./xmltv.xml');
    
    // Define the request to api.hdhomerun.com
    let response = await axios({
      method: 'GET',
      url: xmltvurl,
      responseType: 'stream',
    });
      
    response.data.pipe(writer);
    await finishedDownload(writer);

    // Remove the now usless/outdated file
    fs.unlinkSync(`./discover.json`)

}, timeout + 1);