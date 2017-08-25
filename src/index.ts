import "reflect-metadata";
import {createConnection} from "typeorm";
import {getEntityManager} from "typeorm";
import {SolarSystem} from "./models/SolarSystem";
import {Region} from "./models/Region";

// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {
    console.log("Connection established");

    let regionRepo = getEntityManager().getRepository(Region);
    const regions = await regionRepo.find({ relations: ["systems"]});

    console.log(regions);

    console.log(regions[0].systems);

}).catch(error => console.log("Error: ", error));