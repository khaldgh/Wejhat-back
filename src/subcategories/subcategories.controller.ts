import { Controller, Get, Param } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {

    constructor(private subcategoriesService: SubcategoriesService){}

    @Get('/:categoryId')
    async getSubcategories(@Param('categoryId') categoryId: number){
      return this.subcategoriesService.getSubcategoriesOfSingleCategory(categoryId)  
    }

    @Get('/place/:placeId')
    getSubcategoriesOfSinglePlace(@Param('placeId') placeId: number) {
      return this.subcategoriesService.getSubcategoriesOfSinglePlace(placeId)
    }
}
