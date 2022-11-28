import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/user.entity';
import { JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

export class UsersFavoriteDto {
  @Expose()
  user_id: number;

  @Expose()
  email: string;

  @IsString()
  password: string;

  @ManyToOne(() => User, (user) => user.usersFavorites)
  user: User;

  @ManyToOne(() => Place, (place) => place.usersFavorites)
  place: Place;

  // @ManyToMany(() => Place)
  // @JoinTable()
  // places: Place[];
}
