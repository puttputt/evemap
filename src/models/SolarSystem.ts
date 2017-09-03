import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import {Region} from "./Region";

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
}