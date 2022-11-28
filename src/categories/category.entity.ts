import { Subcategory } from "src/subcategories/subcategory.entity";
import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, PrimaryColumn, ManyToMany, JoinTable } from "typeorm"
import { Place } from "../places/entities/place.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    category: string;

    @OneToMany(() => Place, (place) => place.category)
    places: Place[];

    @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
    subcategories: Subcategory[];

}