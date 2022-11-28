import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import { Place } from 'src/places/entities/place.entity';
import { JoinTable, ManyToMany, OneToMany } from 'typeorm';

export class SigninUserDto {
  @Expose()
  user_id: number;

  @Expose()
  @IsString()
  email: string;
  
  @IsString()
  password: string;

  @OneToMany(() => Place, (place) => place.creatorId)
  place: Place[];

  @OneToMany(() => Comment, (comment) => comment.user)
  Comment: Comment[];

  @ManyToMany(() => Category)
  @JoinTable()
  Categories: Category[];

  @ManyToMany(() => Place)
  @JoinTable()
  places: Place[];


}
