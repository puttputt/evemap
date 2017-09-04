import * as rp from 'request-promise';
import { getEntityManager } from "typeorm";
import { AllianceDTO, Alliance } from "../models/Alliance"
import { SovDTO, Sov } from "../models/Sov";
import { SolarSystem } from "../models/SolarSystem";

export class EveService {

    public getAlliancesFromESI(): void {
        const allianceEndpoint = 'https://esi.tech.ccp.is/latest/alliances/?datasource=tranquility';

        const allianceNamesEndpoint = 'https://esi.tech.ccp.is/latest/alliances/names/?alliance_ids=';

        rp.get(allianceEndpoint).then((result) => {

            var promiseArray = new Array();

            var json: number[] = JSON.parse(result);


            while (json.length >= 100) {
                var ids = json.splice(0, 100);
                let csvAllianceId = ids.join('%2C%20 ');
                let newEndpoint = allianceNamesEndpoint + csvAllianceId + '&datasource=tranquility';
                let promise = rp.get(newEndpoint);
                promiseArray.push(promise);
            }

            Promise.all(promiseArray).then((results) => {
                const allianceRepository = getEntityManager().getRepository(Alliance);
                var alliances = new Array();
                results.forEach((allianceArray) => {
                    var parsedResult = JSON.parse(allianceArray);

                    var readyForSaveAlliances = new Array();

                    parsedResult.forEach(allianceObject => {
                        var alliance = Alliance.create(allianceObject);
                        readyForSaveAlliances.push(alliance);
                    });

                    allianceRepository.persist(readyForSaveAlliances);

                });
            }).catch((error) => {
                console.error(error);
            });


        }).catch((error) => {
            console.error(error);
        });
    }

    public getSovFromESI() {
        const sovEndpoint = 'https://esi.tech.ccp.is/latest/sovereignty/map/?datasource=tranquility';

        rp.get(sovEndpoint).then((result) => {
            var json: SovDTO[] = JSON.parse(result);
            var sovToAdd: Sov[] = Array();
            const sovRepository = getEntityManager().getRepository(Sov);
            const allianceRepository = getEntityManager().getRepository(Alliance);
            const systemRepository = getEntityManager().getRepository(SolarSystem);

            json.forEach(sovObj => {
                if (sovObj.alliance_id != null) {
                    sovRepository.findOne({ system: sovObj.system_id })
                        .then((sov) => {
                            allianceRepository.findOneById(sovObj.alliance_id)
                                .then((alliance) => {
                                    sov.alliance = alliance;
                                    sovRepository.persist(sov)
                                        .then(() => {
                                            systemRepository.findOneById(sovObj.system_id)
                                                .then((system) => {
                                                    system.sov = sov;
                                                    console.log(system);
                                                    systemRepository.persist(system)
                                                        .then(()=>{console.log("SAVED")})
                                                        .catch((err) => { console.log("FAILED" + err)});
                                                });
                                        });
                                });
                        });
                }
            });
        }).catch((error) => {
            console.error(error);
        })
    }
}