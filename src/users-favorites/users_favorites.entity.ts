import { userInfo } from "os";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Place } from "../places/entities/place.entity";


@Entity()
export class UsersFavorites {
    @PrimaryGeneratedColumn()
    usersFavoriteId: number;

    @Column()
    userId: number;

    @Column()
    placeId: number;

    @CreateDateColumn()
    creationDate: Date;

    @ManyToOne(() => User, (user) => user.usersFavorites)
    user: User;

    @ManyToOne(() => Place, (place) => place.usersFavorites)
    place: Place;
}