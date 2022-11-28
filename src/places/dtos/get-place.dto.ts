import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class GetPlaceDto {

  // @IsNumber()
  // place_id: number;

  @IsString()
  title: string;

  // @IsString()
  // description: string;

  // @IsString()
  // signature: string;
  
  // @IsString()
  // sub_category_id: number;

  // @IsNumber()
  // sub_category_id_2: number;

  // @IsNumber()
  // sub_category_id_3: number;

  // @IsNumber()
  // neighborhood_id: number;

  // @IsNumber()
  // opening_hours_id: number;

  // @IsBoolean()
  // isFavorite: boolean;

  // @IsBoolean()
  // approved: boolean;

  // @IsNumber()
  // phone: number;

  // @IsString()
  // website: string;

  // @IsString()
  // instagram: string;

  
  // user_id: User;
}
