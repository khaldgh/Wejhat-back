import { Category } from 'src/categories/category.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @ManyToOne(() => User, (user) => user.Comment)
  user: User;

  @ManyToOne(() => Place, (place) => place.comments)
  place: Place

  
}
