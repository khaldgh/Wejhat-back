import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { PlaceDto } from "src/places/dtos/place.dto";
import { Place } from "src/places/entities/place.entity";

export class CommentDto {
    @IsString()
    @Expose()
    comment:string

    // @Expose()
    // placee:PlaceDto
}