// Import JSON objects from discover.json
// Import fs for final output
import dotenv from "dotenv"
import * as fs from 'fs';
import * as stream from 'stream';
import axios from 'axios';
import {
    promisify
} from 'util';
dotenv.config();

// Obtain the latest discover.json
let response = await axios({
    method: 'GET',
    url: `http://${process.env.LOCALIP}/discover.json`
});

// Define a variable for the url of the xmltv data
let xmltvurl = `https://api.hdhomerun.com/api/xmltv?DeviceAuth=${response.data.DeviceAuth}`
// Define what to do with the data
let finishedDownload = promisify(stream.finished);
let writer = fs.createWriteStream('./xmltv.xml');

// Define the request to api.hdhomerun.com
let responsestream = await axios({
    method: 'GET',
    url: xmltvurl,
    responseType: 'stream',
});
// Take response and write it to file
responsestream.data.pipe(writer);
await finishedDownload(writer);