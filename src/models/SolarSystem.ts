import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";
import {Region} from "./Region";

@Entity()
export class SolarSystem {

    @PrimaryColumn()
    solarSystemID : number;

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

    //@Column()
    //regionID : number;
    @ManyToOne(type => Region, region => region.systems)
    region : Region;
}