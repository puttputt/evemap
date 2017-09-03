import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import {SolarSystem} from "./SolarSystem";

@Entity()
export class Region {

    @PrimaryColumn()
    id : number;

    @Column()
    regionName : string;

    @Column({"type" : "double"})
    x : number;

    @Column({"type" : "double"})
    y : number;

    @Column({"type" : "double"})
    z : number;

    @Column({"nullable" : true})
    factionID : number;

    @OneToMany(type => SolarSystem, system => system.region)
    systems : SolarSystem[];

    public static sanitizeData(regions : Region[]): Region[] {
        regions.forEach(function(region) {
            region.systems.forEach(function(system) {
                system.x = this.resetCoord(system.x);
                system.y = this.resetCoord(system.z);
                system.z = null;
            });
            region.x = this.resetCoord(region.x);
            region.y = this.resetCoord(region.z);
            region.z = null;
        });

        return regions;
    }

    private resetCoord(coordinate : number) : number {
        var newCoordinate = coordinate / 10000000000000000;
        newCoordinate = newCoordinate * 10;
        newCoordinate += 500;
        return newCoordinate;
    }
}