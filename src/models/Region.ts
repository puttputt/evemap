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
}