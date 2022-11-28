import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import { Place } from 'src/places/entities/place.entity';
import { UsersFavorites } from 'src/users-favorites/users_favorites.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Place, (place) => place.creatorId)
  place: Place[];

  @OneToMany(() => Comment, (comment) => comment.user)
  Comment: Comment[];

  @ManyToMany(() => Category)
  @JoinTable({ name: 'preferences' })
  Categories: Category[];

  @OneToMany(() => UsersFavorites, (usersFavorites) => usersFavorites.user)
  usersFavorites: UsersFavorites[];

}
