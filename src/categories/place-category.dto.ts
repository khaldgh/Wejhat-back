
import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class PlaceCateogryDto {
    
    @Expose()
    category_id: number;

    @Expose()
    category: string;
}