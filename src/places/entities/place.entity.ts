import { Comment } from 'src/comments/comment.entity';
import { Subcategory } from 'src/subcategories/subcategory.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/category.entity';
import { Neighborhood } from '../../neighborhoods/neighborhood.entity';
import { UsersFavorites } from '../../users-favorites/users_favorites.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  place_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: null })
  phone: number;

  @Column({ default: null })
  website: string;

  @Column({ default: null })
  instagram: string;

  @Column()
  Sunday: string;

  @Column()
  Monday: string;

  @Column()
  Tuesday: string;

  @Column()
  Wednesday: string;

  @Column()
  Thursday: string;

  @Column()
  Friday: string;

  @Column()
  Saturday: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.place)
  creatorId: User;

  @ManyToOne(() => Category, (category) => category.places)
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.place)
  comments: Comment[];

  @ManyToMany(() => Neighborhood)
  @JoinTable()
  neighborhoods: Neighborhood[];

  @OneToMany(() => UsersFavorites, (usersFavorites) => usersFavorites.place)
  usersFavorites: UsersFavorites[];

  @ManyToMany(() => Subcategory)
  @JoinTable({ name: 'tags' })
  subcategories: Subcategory[];
}
