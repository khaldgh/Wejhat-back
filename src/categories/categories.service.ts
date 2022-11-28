import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repo: Repository<Category>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  getCategories() {
    return this.repo.createQueryBuilder().select('*')
    .where('category_id NOT IN (75, 135, 145)')
      .getRawMany();
  }

  getBigCategories() {
    return this.repo.createQueryBuilder().select('*')
    .where('category_id IN (75, 135, 145)')
      .getRawMany();
  }

  async postCategories(createCategoryDto: CreateCategoryDto) {
    const category = this.repo.create(createCategoryDto);
    return this.repo.save(category);
  }
}
