import { Place } from 'src/places/entities/place.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Owner {

    @PrimaryGeneratedColumn()
    owner_id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

}