import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor( private categoriesService: CategoriesService){}

    @Get()
    async getCategories(){
        return this.categoriesService.getCategories();
    }

    @Get('bigCategories')
    async getBigCategories(){
        return this.categoriesService.getBigCategories();
    }

    @Post()
    async postCategories(createCategoryDto: CreateCategoryDto){
        await this.categoriesService.postCategories(createCategoryDto);
    }
}
