import { IsNumber } from "class-validator";


export class PlaceCommentDto {

    @IsNumber()
    place_id: number;

}