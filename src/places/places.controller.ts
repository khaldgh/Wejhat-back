import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
  Query
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePlaceDto } from './dtos/create-place.dto';
import { PlacesService } from './places.service';
import { User } from '../users/user.entity';
import { currentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApprovePlaceDto } from './dtos/approve-place.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { Neighborhood } from 'src/neighborhoods/neighborhood.entity';
import { Category } from 'src/categories/category.entity';
import { PlaceCateogryDto } from 'src/categories/place-category.dto';


@Controller('places')
export class PlacesController {
  constructor(
    private placesService: PlacesService,
  ) {}
  @Post()
  // @UseGuards(AuthGuard)
  @Serialize(CreatePlaceDto)
  createPlace(
    @Body() body: CreatePlaceDto,
    @currentUser() user: UserDto,
  ) {
    console.log(body, user);
    return this.placesService.create(body, user);
  }


  @Patch('/:id')
  // @UseGuards(AdminGuard)
  approvePlace(@Param('id') id: string, @Body() body: ApprovePlaceDto) {
    return this.placesService.changeApproval(id, body);
  }

  @Delete('/:id')
  // @UseGuards(AdminGuard)
  deletePlace(
    @Param('id') id: number,
    //  @Body() body: ApprovePlaceDto
  ) {
    return this.placesService.deletePlace(
      id,
      //  body.approved
    );
  }

  @Get('/search/:phrase')
  async searchPlace(@Param('phrase') phrase: string){
    return this.placesService.searchPlace(phrase);
  }

  @Get('/places')
  @UseGuards(AuthGuard)
  async getPlaces() {
    return await this.placesService.getPlaces();
  }

  @Get('/queryPlaces')
  @UseGuards(AuthGuard)
  queryPlaces(@Query() query: string) {
    return this.placesService.queryPlaces(query);
  }

  @Get('/findOne/:id')
  getOnePlace(@Param('id') id: number) {
    return this.placesService.getOnePlace(id);
  }

  @Get('/mostdayvisited')
  mostDayVisitedPlaces() {
    return this.placesService.mostDayVisitedPlaces();
  }

  @Get('/mostweekvisited')
  mostWeekVisitedPlaces() {
    return this.placesService.mostWeekVisitedPlaces();
  }

  @Get('/pre-approved-places')
  // @UseGuards(AdminGuard)
  getPreApprovedPlaces() {
    return this.placesService.getPreApprovedPlaces();
  }

  @Get('/favorite-places')
  async getFavoritePlaces(@currentUser() user: User){
    console.log(user)
    return this.placesService.getFavoritePlaces(user.user_id);
  }

  //   @Post('/comments')
  //   newCommentPlace(
  //     commentUser: User,
  //     commentDto: CommentDto,
  //     place: Place,
  //   ){
  //     return this.placesService.newCommentPlace(commentUser, commentDto, place);
  //   }
}
