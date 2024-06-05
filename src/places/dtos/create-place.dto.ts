import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsLatitude,
  IsLongitude,
  IsString,
  IsNumber,
  Max,
  max,
  Min,
  min,
  IsObject,
  IsArray,
} from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { PlaceCateogryDto } from 'src/categories/place-category.dto';
import { Neighborhood } from 'src/neighborhoods/neighborhood.entity';
import { SubcategoryDto } from 'src/subcategories/subcategory.dto';
import { Subcategory } from 'src/subcategories/subcategory.entity';

export class CreatePlaceDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsBoolean()
  approved: boolean;
  @IsNumber()
  phone: number;
  @IsString()
  website: string;
  @IsString()
  instagram: string;
  @IsString()
  Sunday: string;
  @IsString()
  Monday: string;
  @IsString()
  Tuesday: string;
  @IsString()
  Wednesday: string;
  @IsString()
  Thursday: string;
  @IsString()
  Friday: string;
  @IsString()
  Saturday: string;

  @IsObject()
  @Type(() => PlaceCateogryDto)
  category: PlaceCateogryDto

  // @IsArray()
  // subcategories: Subcategory[];
  
  @IsArray()
  neighborhoods: Neighborhood[]
}
