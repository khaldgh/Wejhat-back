import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { Category } from 'src/categories/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Category]), CategoriesModule],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService]
})
export class PlacesModule {}
