import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neighborhood } from './neighborhood.entity';
import { NeighborhoodsController } from './neighborhoods.controller';
import { NeighborhoodsService } from './neighborhoods.service';

@Module({
    imports: [TypeOrmModule.forFeature([Neighborhood])],
    controllers: [NeighborhoodsController],
    providers: [NeighborhoodsService],
})
export class NeighborhoodsModule {}
