import { Place } from 'src/places/entities/place.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    admin_id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

}