import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { City } from "../cities/city.entity";
import { Place } from "../places/entities/place.entity";

@Entity()
export class Neighborhood {

    @PrimaryGeneratedColumn()
    neighborhood_id: number;

    @Column()
    neighborhood: string;

    @ManyToOne(() => City, (city) => city.neighborhoods)
    city: City;

}