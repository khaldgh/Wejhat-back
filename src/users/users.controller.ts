import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
  Session,
  UseGuards,
  Req,
  Patch,
  Put,
  Delete,
  Redirect,
  Res,
} from '@nestjs/common';
// import { parse } from 'path/posix';
import { Response } from 'express';
import { SignupUserDto } from './dtos/signup_user.dto';
import { SigninUserDto } from './dtos/signin_user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
// import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import * as passport from '@nestjs/passport';
import { Category } from 'src/categories/category.entity';
import { UsersFavoriteDto } from 'src/places/dtos/users-favorite.dto';
import { UserDto } from './dtos/user.dto';

@Controller('users')
// @Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    // private authService: AuthService,
  ) {}

  @Get('/whoami')
  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  whoAmI(@currentUser() user: User, @Session() session: any) {
    console.log(user);
    return user;
  }

  @Post('/preferences')
  async setPreferences(
    @currentUser() user: User,
    @Body() categories: Category[],
  ) {
    return await this.usersService.setPreferences(user, categories);
  }

  @Get('/preferences')
  async getPreferences(@currentUser() user: User) {
    return await this.usersService.getPreferences(user);
    // console.log(user.Categories);
  }

  @Serialize(UsersFavoriteDto)
  @Post('/favoritePlace/:id')
  async favoritePlace(@currentUser() user: UserDto, @Param('id') id: string) {
    return this.usersService.favoritePlaces(user, id);
  }

  @Delete('/favoritePlace/:id')
  async removeUserFavorite(
    @currentUser() user: UserDto,
    @Param('id') id: string,
  ) {
    return this.usersService.removeUserFavorite(user, id);
  }

  @Get()
  @Serialize(UserDto)
  getUsers(@Query('email') email: string) {
    // return this.usersService.find(email);
  }

  @Patch('/make-admin')
  async makeAdmin(@currentUser() user: User, @Session() session: any) {
    return this.usersService.makeAdmin(user, session);
  }

  @Post('/signup')
  @Serialize(SignupUserDto)
  async sendUser(@Body() body: SignupUserDto, @Session() session: any) {
    // console.log(body);
    console.log(session);
    const user = await this.usersService.signup(
      body.email,
      body.username,
      body.password,
    );
    session.userId = user.user_id;
    console.log(session.userId);
    return user;
  }

  @Post('/signin')
  @Serialize(SigninUserDto)
  async signin(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.usersService.signin(body.email, body.password);
    session.userId = user.user_id;
    return user;
  }
  @Post('/signout')
  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  async signout(@Session() session: any) {
    // console.log(session.userId);
    if (!session.userId) {
      throw new NotFoundException('user not found');
    }
    session.userId = null;
  }

  @Post('/forgot-password')
  async confirmEmailForPasswordReset(@Query() email: string) {
    return this.usersService.confirmEmailForPasswordReset(email);
  }

  @Get('/forgot-password/:token')
  async confirmTokenLink(@Param('token') token: string, @Res() res: Response){
    return this.usersService.confirmTokenLink(token, res)
  }

  @Post('/reset-password')
  resetPassword(@Body() body: UserDto ) {
    return this.usersService.passwordReset(body.email, body.password);
  }

  @Get('/google')
  @UseGuards(passport.AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(passport.AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'no user from google';
    }
    return {
      message: 'User info from google',
      user: req.user,
    };
  }

  @Get('/facebook')
  @UseGuards(passport.AuthGuard('facebook'))
  async facebookAuth(@Req() req) {}

  @Get('facebook/callback')
  @UseGuards(passport.AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    console.log(req.user);
    if (!req.user) {
      return 'no user from facebook';
    }
    return {
      message: 'User info from facebook',
      user: req.user,
    };
  }

  @Get('/twitter')
  @UseGuards(passport.AuthGuard('twitter'))
  async twitterAuth(@Req() req) {}

  @Get('twitter/callback')
  @UseGuards(passport.AuthGuard('twitter'))
  twitterAuthRedirect(@Req() req) {
    console.log(req.user);
    if (!req.user) {
      return 'no user from twitter';
    }
    return {
      message: 'User info from twitter',
      user: req.user,
    };
  }

  @Get('/instagram')
  @UseGuards(passport.AuthGuard('facebook'))
  async instagramAuth(@Req() req) {}

  @Get('instagram/callback')
  @UseGuards(passport.AuthGuard('facebook'))
  instagramAuthRedirect(@Req() req) {
    console.log(req.user);
    if (!req.user) {
      return 'no user from instagram';
    }
    return {
      message: 'User info from instagram',
      user: req.user,
    };
  }

  @Get('/sendMailer')
  sendMailer(@Res() response: any){
    const mail = this.usersService.sendMail();

    return response.status(200).json({
      message: 'success',
      mail,
    });
  }

  // @Get('users-preferences')
  //   async userPreferences(category: ){
  //     return this.usersService.userPreferences(categoryId);
  //   }
}
