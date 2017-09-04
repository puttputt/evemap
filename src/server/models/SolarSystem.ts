import {Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {Region} from "./Region";
import {Alliance} from "./Alliance";
import {Sov} from "./Sov";

@Entity()
export class SolarSystem {

    @PrimaryColumn()
    id : number;

    @Column()
    solarSystemName : string;

    @Column({"type" : "double"})
    x : number;

    @Column({"type" : "double"})
    y : number;

    @Column({"type" : "double"})
    z : number;

    @Column({"nullable" : true})
    factionID : number;

    @ManyToOne(type => Region, region => region.systems)
    region : Region;

    @OneToOne(type => Sov)
    @JoinColumn()
    sov: Sov;

    public static sanitizeData(sytems : SolarSystem[]): SolarSystem[] {
        sytems.forEach(function(system) {
            system.x = system.resetCoord(system.x);
            system.y = system.resetCoord(system.z);
            system.z = null;

            system.region.x = system.resetCoord(system.region.x);
            system.region.y = system.resetCoord(system.region.z);
            system.region.z = null;
        });

        return sytems;
    }

    private resetCoord(coordinate : number) : number {
        var newCoordinate = coordinate / 10000000000000000;
        newCoordinate = newCoordinate * 10;
        newCoordinate += 500;
        return newCoordinate;
    }
}