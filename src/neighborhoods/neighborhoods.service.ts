import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neighborhood } from './neighborhood.entity';
import { DataSource, Repository } from 'typeorm';
import { NeighborhoodDto } from './neighborhood.dto';

@Injectable()
export class NeighborhoodsService {
  constructor(
    @InjectRepository(Neighborhood) private repo: Repository<Neighborhood>
  ) {}
  // constructor(private dataSource: DataSource){}


  async getNeighborhoods() {
    this.repo.find();
  }
  
  async neighborhoodQuery({ city_id }: NeighborhoodDto) {
    return this.repo
      .createQueryBuilder()
      .select('neighborhood_id, neighborhood')
      .where('cityCityId = :city_id', { city_id } )
      .getRawMany();
  }
}
