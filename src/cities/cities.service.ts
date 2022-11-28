import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/cities/city.entity';
import { AppDataSource } from 'src/datasource';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(@InjectRepository(City) private repo: Repository<City>) {}


  async getCities() {
    return AppDataSource.manager.find(City)
    //  this.repo.find();
  }

  
}
