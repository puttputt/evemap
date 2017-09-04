import {Entity, Column, PrimaryColumn, ManyToOne} from "typeorm";

export interface AllianceDTO {
    alliance_id: number;
    alliance_name : string;
}

@Entity()
export class Alliance {

    @PrimaryColumn()
    id : number;

    @Column()
    name : string;

    static create(dto : AllianceDTO) : Alliance {
        var alliance = new Alliance();
        alliance.id = dto.alliance_id;
        alliance.name = dto.alliance_name;
        return alliance;
    }
}