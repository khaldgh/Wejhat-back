
import { IsString, IsNumber } from 'class-validator';

export class CreateCategoryDto {
    @IsNumber()
    category_id: number;

    @IsString()
    category: string;
}