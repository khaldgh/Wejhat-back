import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class NeighborhoodDto {


    @IsString()
    city_id: string;

}