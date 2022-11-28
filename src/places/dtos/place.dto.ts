import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PlaceDto {
  @IsNumber()
  @Expose()
  place_id: number;
  @IsString()
  @Expose()
  title: string;
  @IsString()
  @Expose()
  description: string;
  @IsBoolean()
  @Expose()
  isFavorite: boolean;
  @IsBoolean()
  @Expose()
  approved: boolean;
  @IsString()
  @Expose()
  phone: number;
  @IsString()
  @Expose()
  website: string;
  @IsString()
  @Expose()
  instagram: string;
  @Expose()
  Sunday: string;
  @Expose()
  Monday: string;
  @Expose()
  Tuesday: string;
  @Expose()
  Wednesday: string;
  @Expose()
  Thursday: string;
  @Expose()
  Friday: string;
  @Expose()
  Saturday: string;

  // @Transform(({ obj }) => obj.user_id)
  // @Expose()
  // userId: number;
}
