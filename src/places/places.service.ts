import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { Neighborhood } from 'src/neighborhoods/neighborhood.entity';
import { UserDto } from 'src/users/dtos/user.dto';
import { Category } from 'src/categories/category.entity';
import { PlaceCateogryDto } from 'src/categories/place-category.dto';
import { ApprovePlaceDto } from './dtos/approve-place.dto';
import { DateTime } from 'aws-sdk/clients/devicefarm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place) private repo: Repository<Place>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  plcId: number = 0;

  async create(
    createPlaceDto: CreatePlaceDto,
    user: UserDto,
  ) {
    const place = this.repo.create(createPlaceDto);
    place.neighborhoods = place.neighborhoods
    // place.subcategories = createPlaceDto.subcategories;
    place.creatorId = user;
    await this.repo.save(place).finally(() => {
      this.plcId = place.place_id;
    });
    return this.plcId;
  }

  async changeApproval(id: string, updatedPlace: ApprovePlaceDto) {
    // var place = await this.repo.findOne(id);
    // if (!place) {
    //   throw new NotFoundException('place not found');
    // }

    // place.title = updatedPlace.title;
    // place.approved = updatedPlace.approved;
    // place.description = updatedPlace.description;
    // place.phone = updatedPlace.phone;
    // place.website = updatedPlace.website;
    // place.instagram = updatedPlace.instagram;

    // return this.repo.save(place);
  }

  async deletePlace(id: number) {
    this.repo.delete(id);
  }

  async searchPlace(phrase: string){
    const places = await this.repo.createQueryBuilder()
    .select('place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId')
    .where('title REGEXP :phrase"."', {phrase})
    .andWhere('approved = 1')
    .getRawMany();

    const categories = await this.repo
      .createQueryBuilder()
      .select(
        'category_id, category',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .getRawMany();

    const neighborhoods = await this.repo
      .createQueryBuilder()
      .select(
        'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId',
      )
      .innerJoin(
        'place_neighborhoods_neighborhood',
        'pnn',
        'place_id = pnn.placePlaceId',
      )
      .innerJoin(
        'neighborhood',
        'n',
        'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
      )
      .getRawMany();

      places.forEach((place) => {
        let newCategory: Category = new Category();
        for (let i = 0; i < categories.length; i++) {
          place.categoryCategoryId === categories[i].category_id
            ? newCategory = categories[i]
            : 0;
        }
        place.category = newCategory;
        place.approved = true
        this.repo.save(place);
      });

    places.forEach((place) => {
      let nList: Neighborhood[] = [];
      for (let i = 0; i < neighborhoods.length; i++) {
        place.place_id === neighborhoods[i].placePlaceId
          ? nList.push(neighborhoods[i])
          : 0;
      }
      place.neighborhoods = nList;
      this.repo.save(place);
    });
    return places;
  }

  async getOnePlace(id: number) {
    const place = await this.repo
      .createQueryBuilder()
      .select(
        'place_id,title,description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, username, email',
      )
      .innerJoin('user', 'u', 'u.user_id = creatorIdUserId')
      .where('place_id = :id', {id})
      .getRawOne();

      const category = await this.repo
      .createQueryBuilder()
      .select(
        'category_id, category',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .where('place_id = :id', {id})
      .getRawOne();

    const neighborhoods = await this.repo
      .createQueryBuilder()
      .select('neighborhood_id, neighborhood')
      .innerJoin(
        'place_neighborhoods_neighborhood',
        'pnn',
        'place_id = pnn.placePlaceId',
      )
      .innerJoin(
        'neighborhood',
        'n',
        'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
      )
      .where('place_id = :id', {id})
      .getRawMany();


    place.category = category;
    place.neighborhoods = neighborhoods;
    place.approved = true;
    // console.log(place);

    await this.repo.save(place);

    return place;
  }

  async getFavoritePlaces(userId) {
    const places = await this.repo
      .createQueryBuilder()
      .select(
        'place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, email',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .innerJoin('user', 'u')
      .innerJoin('users_Favorites', 'uf', `uf.userUserId = u.user_id`)
      .where('place_id = placePlaceId')
      .andWhere(`approved = 1`)
      .andWhere('user_id = :userId', {userId})
      .orderBy('creationDate', 'DESC')
      .getRawMany();

      const categories = await this.repo
      .createQueryBuilder()
      .select(
        'category_id, category',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .getRawMany();

    const neighborhoods = await this.repo
      .createQueryBuilder()
      .select(
        'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId',
      )
      .innerJoin(
        'place_neighborhoods_neighborhood',
        'pnn',
        'place_id = pnn.placePlaceId',
      )
      .innerJoin(
        'neighborhood',
        'n',
        'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
      )
      .getRawMany();

      places.forEach((place) => {
        let newCategory: Category = new Category();
        for (let i = 0; i < categories.length; i++) {
          place.categoryCategoryId === categories[i].category_id
            ? newCategory = categories[i]
            : 0;
        }
        place.category = newCategory;
        place.approved = true
        this.repo.save(place);
      });

    places.forEach((place) => {
      let nList: Neighborhood[] = [];
      for (let i = 0; i < neighborhoods.length; i++) {
        place.place_id === neighborhoods[i].placePlaceId
          ? nList.push(neighborhoods[i])
          : 0;
      }
      place.neighborhoods = nList;
      this.repo.save(place);
    });
    return places;
  }

  async getPlaces() {
    const places = await this.repo
      .createQueryBuilder()
      .select(
        'place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, email',
      )
      .innerJoin('user', 'u', 'u.user_id = creatorIdUserId')
      .where('approved = 1')
      .orderBy('place_id', 'ASC')
      .getRawMany();

      const categories = await this.repo
      .createQueryBuilder()
      .select(
        'category_id, category',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .getRawMany();

    const neighborhoods = await this.repo
      .createQueryBuilder()
      .select(
        'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId',
      )
      .innerJoin(
        'place_neighborhoods_neighborhood',
        'pnn',
        'place_id = pnn.placePlaceId',
      )
      .innerJoin(
        'neighborhood',
        'n',
        'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
      )
      .getRawMany();

      // console.log(categories);

      places.forEach((place) => {
        let newCategory: Category = new Category();
        for (let i = 0; i < categories.length; i++) {
          place.categoryCategoryId === categories[i].category_id
            ? newCategory = categories[i]
            : 0;
        }
        place.category = newCategory;
        place.approved = true
        this.repo.save(place);
      });

    places.forEach((place) => {
      let nList: Neighborhood[] = [];
      for (let i = 0; i < neighborhoods.length; i++) {
        place.place_id === neighborhoods[i].placePlaceId
          ? nList.push(neighborhoods[i])
          : 0;
      }
      place.approved = true
      place.neighborhoods = nList;
      this.repo.save(place);
    });
    // console.log(places)
    return places;
  }

  async mostDayVisitedPlaces(){
    const places = await this.repo
    .createQueryBuilder()
    .select(
      'place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, email',
    )
    .innerJoin('user', 'u', 'u.user_id = creatorIdUserId')
    .where('approved = 1')
    .andWhere('updated_at >= NOW() - INTERVAL 1 DAY')
    .orderBy('place_id', 'ASC')
    .getRawMany();

    const categories = await this.repo
    .createQueryBuilder()
    .select(
      'category_id, category',
    )
    .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
    .getRawMany();

  const neighborhoods = await this.repo
    .createQueryBuilder()
    .select(
      'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId',
    )
    .innerJoin(
      'place_neighborhoods_neighborhood',
      'pnn',
      'place_id = pnn.placePlaceId',
    )
    .innerJoin(
      'neighborhood',
      'n',
      'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
    )
    .getRawMany();

    // console.log(categories);

    places.forEach((place) => {
      let newCategory: Category = new Category();
      for (let i = 0; i < categories.length; i++) {
        place.categoryCategoryId === categories[i].category_id
          ? newCategory = categories[i]
          : 0;
      }
      place.category = newCategory;
      place.approved = true
      this.repo.save(place);
    });

  places.forEach((place) => {
    let nList: Neighborhood[] = [];
    for (let i = 0; i < neighborhoods.length; i++) {
      place.place_id === neighborhoods[i].placePlaceId
        ? nList.push(neighborhoods[i])
        : 0;
    }
    place.approved = true
    place.neighborhoods = nList;
    this.repo.save(place);
  });
  // console.log(places)
  return places;
  }

  async mostWeekVisitedPlaces(){
    const places = await this.repo
    .createQueryBuilder()
    .select(
      'place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, email',
    )
    .innerJoin('user', 'u', 'u.user_id = creatorIdUserId')
    .where('approved = 1')
    .andWhere('updated_at >= NOW() - INTERVAL 1 WEEK')
    .orderBy('place_id', 'ASC')
    .getRawMany();

    const categories = await this.repo
    .createQueryBuilder()
    .select(
      'category_id, category',
    )
    .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
    .getRawMany();

  const neighborhoods = await this.repo
    .createQueryBuilder()
    .select(
      'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId',
    )
    .innerJoin(
      'place_neighborhoods_neighborhood',
      'pnn',
      'place_id = pnn.placePlaceId',
    )
    .innerJoin(
      'neighborhood',
      'n',
      'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
    )
    .getRawMany();

    // console.log(categories);

    places.forEach((place) => {
      let newCategory: Category = new Category();
      for (let i = 0; i < categories.length; i++) {
        place.categoryCategoryId === categories[i].category_id
          ? newCategory = categories[i]
          : 0;
      }
      place.category = newCategory;
      place.approved = true
      this.repo.save(place);
    });

  places.forEach((place) => {
    let nList: Neighborhood[] = [];
    for (let i = 0; i < neighborhoods.length; i++) {
      place.place_id === neighborhoods[i].placePlaceId
        ? nList.push(neighborhoods[i])
        : 0;
    }
    place.approved = true
    place.neighborhoods = nList;
    this.repo.save(place);
  });
  // console.log(places)
  return places;
  }

  async queryPlaces(categories: string) {
    const catsArray: number[] = [];
    var cats = categories['categories'];
    var splitCats = cats.split(',');
    for (var num of splitCats) {
      var parsed = parseInt(num);
      catsArray.push(parsed);
    }

      const places = await this.repo
      .createQueryBuilder()
      .select(
        'place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, email',
      )
      .innerJoin('user', 'u', 'u.user_id = creatorIdUserId')
      .where('approved = 1')
      .andWhere('categoryCategoryId in (:catsArray)', { catsArray })
      .orderBy('place_id', 'ASC')
      .getRawMany();

      const categoriesQuery = await this.repo
      .createQueryBuilder()
      .select(
        'category_id, category',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .getRawMany();


    const neighborhoods = await this.repo
      .createQueryBuilder()
      .select(
        'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId',
      )
      .innerJoin(
        'place_neighborhoods_neighborhood',
        'pnn',
        'place_id = pnn.placePlaceId',
      )
      .innerJoin(
        'neighborhood',
        'n',
        'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
      )
      .getRawMany();

      var newCategory: Category = new Category()
      for(var i1 = 0; i1 < places.length; i1++) {
        for (var i2 = 0; i2 < categoriesQuery.length; i2++) {
          if(places[i1].categoryCategoryId === categoriesQuery[i2].category_id){
            newCategory = categoriesQuery[i2]
          } 
        }
        places[i1].approved = true
        places[i1].category = newCategory;
        this.repo.save(places[i1]);
      };
      console.log(newCategory)

    places.forEach((place) => {
      let nList: Neighborhood[] = [];
      for (let i = 0; i < neighborhoods.length; i++) {
        place.place_id === neighborhoods[i].placePlaceId
          ? nList.push(neighborhoods[i])
          : 0;
      }
      place.approved = true
      place.neighborhoods = nList;
      this.repo.save(place);
    });
    return places;
  }

  async getPreApprovedPlaces() {
    const places = await this.repo
      .createQueryBuilder()
      .select(
        'place_id,title, description,approved,phone,website,instagram,Sunday,monday,tuesday,wednesday,thursday,friday,saturday, categoryCategoryId, email',
      )
      .innerJoin('user', 'u', 'u.user_id = creatorIdUserId')
      .where('approved = 0')
      .orderBy('place_id', 'ASC')
      .getRawMany();

      const categories = await this.repo
      .createQueryBuilder()
      .select(
        'category_id, category',
      )
      .innerJoin('category', 'c', 'c.category_id = categoryCategoryId')
      .getRawMany();

    const neighborhoods = await this.repo
      .createQueryBuilder()
      .select(
        'neighborhood_id, neighborhood, neighborhoodNeighborhoodId, placePlaceId, city_id, city',
      )
      .innerJoin(
        'place_neighborhoods_neighborhood',
        'pnn',
        'place_id = pnn.placePlaceId',
      )
      .innerJoin(
        'neighborhood',
        'n',
        'n.neighborhood_id = pnn.neighborhoodNeighborhoodId',
      )
      .innerJoin('city', 'c', 'n.cityCityId = city_id')
      .getRawMany();

      places.forEach((place) => {
        let newCategory: Category = new Category();
        for (let i = 0; i < categories.length; i++) {
          place.categoryCategoryId === categories[i].category_id
            ? newCategory = categories[i]
            : 0;
        }
        place.categories = newCategory;
        this.repo.save(place);
      });

    places.forEach((place) => {
      let nList: Neighborhood[] = [];
      for (let i = 0; i < neighborhoods.length; i++) {
        place.place_id === neighborhoods[i].placePlaceId
          ? nList.push(neighborhoods[i])
          : 0;
      }
      place.neighborhoods = nList;
      this.repo.save(place);
    });
    return places;
  }
}
