import "reflect-metadata";
import * as http from 'http';
import * as debug from 'debug';
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {getEntityManager} from "typeorm";
import {SolarSystem} from "./models/SolarSystem";
import {Region} from "./models/Region";
import {MapRouter} from "./routes/MapRouter";
import * as express from "express";
import * as bodyParser from "body-parser";
import App from './App';


createConnection().then(async connection => {
    console.log("Connection established");

    const regionRepository = getEntityManager().getRepository(Region);
    const regions = await regionRepository.find();
    console.log(regions);

}).catch(error => console.log("Error: ", error));

// app.get('/', function(req, res) {
//     res.render('index', {});
// });




debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


createConnection().then(async connection => {
  console.log("TypeORM connection established.");
  
}).catch(error => console.error("TypeORM connection error: ", error));


function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}