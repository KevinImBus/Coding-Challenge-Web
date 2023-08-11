import http from 'http';
import express from 'express';
import cors from 'cors';
import { createHmac } from 'crypto';
import * as fs from 'fs';

import environment from '../environment/environment.json';


const app = express();

app.use(express.json());



app.use(cors());

/**
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     description: Retrieve a list of messages from the local database file.
*/

  
const decoder = (str: string):string => Buffer.from(str, 'base64').toString('binary');
  const fileContent = fs.readFileSync('data/gibberish.enc','utf8');
  const decodedData = decoder(fileContent);

  // Database
  let database = JSON.parse(decodedData) as Message[];

app.get('/messages', (_: express.Request, response: express.Response) => {
  
  response.send(database);
});

/**
 * /messages:
 *   post:
 *     summary: Save an incoming message
 *     description: Save an incoming message to the local database file.
*/
app.post('/messages', (request: express.Request, response: express.Response) => {
  if (typeof request.headers['x-api-key'] !== 'string') {
    return response.sendStatus(403);
  }


  // Hash the API key from the request headers with the MD5 algorithm and check if it matches with API key from the environment.
  const apiKeyHashed = createHmac("md5", environment.SECRET_KEY).update(request.headers['x-api-key']).digest("hex");
 console.log(apiKeyHashed);
  if (apiKeyHashed !== environment.API_KEY) {
    return response.sendStatus(403);
  }

  

  const message = request.body;
  
  database.push(message);

  console.log(database);

  response.sendStatus(201);
});

http.createServer(app);

const port = process.env.PORT || 1337;

app.listen(port);

// Sorting by sentAt
database.sort((a: Message, b: Message) => a.sentAt - b.sentAt);


console.log(`Running on port ${port}`);
