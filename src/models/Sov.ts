import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import {SolarSystem} from './SolarSystem';
import {Alliance} from './Alliance';

export interface SovDTO {
    system_id : number;
    faction_id : number;
    alliance_id : number;
}

@Entity()
export class Sov {

    @PrimaryGeneratedColumn({ type: "int" })
    id : number;

    @Column({ type: "int" })
    system : number;

    // @Column({ type: "int" })
    // allianceId : number;

    // static create(dto : SovDTO) : Sov {
    //     var sov = new Sov();
    //     sov.system = dto.system_id;
    //     sov.allianceId = dto.alliance_id;
    //     return sov;
    // }

    @OneToOne(type => Alliance)
    @JoinColumn()
    alliance : Alliance;
}