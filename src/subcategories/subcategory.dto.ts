import { IsString } from "class-validator";


export class SubcategoryDto {

    @IsString()
    subcategory: string;

}