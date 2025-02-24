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

//Obtain the latest discover.json
wget({
    url:  `http://${process.env.LOCALIP}/discover.json`,     
    dest: './',
    timeout: 2000       
});

//Set an timeout/sleep to make sure discover.json is the latest 
setTimeout(function(){
    // Import the new discover.json
    let discoverjson = require('./discover.json');
    // Define a variable for the url of the xmltv data
    let xmltvurl = `https://api.hdhomerun.com/api/xmltv?DeviceAuth=${discoverjson.DeviceAuth}`
    console.log(xmltvurl);

    (async () => {
        const finishedDownload = promisify(stream.finished);
        const writer = fs.createWriteStream('./xmltv.xml');
      
        const response = await axios({
          method: 'GET',
          url: xmltvurl,
          responseType: 'stream',
        });
      
        response.data.pipe(writer);
        await finishedDownload(writer);
      })();

}, 2500);