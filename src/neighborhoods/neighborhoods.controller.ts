import { Controller, Get, Param, Query } from '@nestjs/common';
import { NeighborhoodDto } from './neighborhood.dto';
import { NeighborhoodsService } from './neighborhoods.service';

@Controller('neighborhoods')
export class NeighborhoodsController {
    constructor(private neighborhoodsService: NeighborhoodsService){}

    @Get()
    neighborhoodQuery(@Query() query: NeighborhoodDto){
        return this.neighborhoodsService.neighborhoodQuery(query);
    }
}
