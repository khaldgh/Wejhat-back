import { Expose, Transform } from 'class-transformer';

export class CategoryDto {
  @Expose()
  category: string;
}
