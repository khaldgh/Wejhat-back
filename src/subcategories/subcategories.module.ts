import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';
import { Subcategory } from './subcategory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Subcategory])],
    controllers: [SubcategoriesController],
    providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
