import { Type } from "class-transformer";
import { Category } from "src/categories/category.entity";
import { PlaceCateogryDto } from "src/categories/place-category.dto";
import { Neighborhood } from "src/neighborhoods/neighborhood.entity";
import { CreatePlaceDto } from "./create-place.dto";


export class CreatePlaceWrapperDto {
    @Type(() => CreatePlaceDto)
    body: CreatePlaceDto;
  
    // @Type(() => Category)
    // category: Category;
  
    // @Type(() => Neighborhood)
    // neighborhoods: Neighborhood[];
  }