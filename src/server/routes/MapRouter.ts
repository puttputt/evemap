import {Router, Request, Response, NextFunction} from 'express';
import {getEntityManager} from "typeorm";
import {Region} from "../models/Region";
import {SolarSystem} from "../models/SolarSystem";

export class MapRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.renderMap);
    }

    public async renderMap(req: Request, res: Response, next: NextFunction) {

        const regionRepository = getEntityManager().getRepository(Region);
        let regions = await regionRepository.createQueryBuilder('region')
            .leftJoinAndSelect("region.systems", "systems")
            .leftJoinAndSelect("systems.sov", "sov")
            .leftJoinAndSelect("sov.alliance", "alliance").getMany();

        let sanitizedRegions = Region.sanitizeData(regions);

        res.send(sanitizedRegions);
    }

    
}

const mapRoutes = new MapRouter();
mapRoutes.init();

export default mapRoutes.router;