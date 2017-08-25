import "reflect-metadata";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {getEntityManager} from "typeorm";
import {SolarSystem} from "./models/SolarSystem";
import {Region} from "./models/Region";
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

createConnection().then(async connection => {
    console.log("Connection established");
}).catch(error => console.log("Error: ", error));

app.listen(3000);

console.log("Express application running on port 3000");