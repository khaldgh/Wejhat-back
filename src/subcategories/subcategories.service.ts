import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory) private repo: Repository<Subcategory>,
  ) {}

  async getSubcategoriesOfSingleCategory(categoryId: number) {
    return this.repo
      .createQueryBuilder()
      .select('subcategory_id, subcategory')
      .where('categoryCategoryId = :categoryId', { categoryId })
      .getRawMany();
  }

  async getSubcategoriesOfSinglePlace(placeId: number) {
    const subcategories = this.repo
    .createQueryBuilder()
    .select('subcategory_id, subcategory')
    .innerJoin('tags', 't', 'subcategory_id = t.subcategorySubcategoryId' )
    .where('placePlaceId = :placeId', { placeId })
    .getRawMany();
    return subcategories;
  }
}
