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
}