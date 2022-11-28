import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { Neighborhood } from "../neighborhoods/neighborhood.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    city_id: number;

    @Column()
    city: string;

    @OneToMany(() => Neighborhood, (neighborhoods) => neighborhoods.city)
    neighborhoods: Neighborhood[];  

}