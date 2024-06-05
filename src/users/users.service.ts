import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { CreateCategoryDto } from 'src/categories/create-category.dto';
import { CategoryDto } from 'src/categories/category.dto';
import { Repository } from 'typeorm';
import { SignupUserDto } from './dtos/signup_user.dto';
import { User } from './user.entity';
import { UsersFavoriteDto } from 'src/places/dtos/users-favorite.dto';
import { Place } from 'src/places/entities/place.entity';
import { currentUser } from './decorators/current-user.decorator';
import { Admin } from './admin.entity';
import { UsersFavorites } from 'src/users-favorites/users_favorites.entity';
import { UserDto } from './dtos/user.dto';
import { Response } from 'express';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { MailerService } from '@nestjs-modules/mailer';


const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Place) private placesRepo: Repository<Place>,
    private readonly mailService: MailerService,
    @InjectRepository(UsersFavorites)
    private ufRepo: Repository<UsersFavorites>,
    @InjectRepository(UsersFavorites)
    private FavoritesRepo: Repository<UsersFavorites>,
    private readonly jwtService: JwtService,
  ) {}

  classUser: User;

  async signup(email: string, username: string, password: string) {
    // see if the email is already in use
    const users = await this.repo.find({
      where: { email: email },
    });
    if (users.length) {
      throw new BadRequestException('user already in use');
    }
    if (password.length <= 0) {
      throw new BadRequestException('password is too short');
    }
    // hash the password
    // generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the salt and the hashed password
    const result = salt + '.' + hash.toString('hex');

    // create the user and save it
    const user = await this.signupUser(email, username, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.repo.find({
      where: { email: email },
    });
    // console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new NotFoundException('wrong password');
    }
    return user;
  }

  async passwordReset(email: string, password: string) {
    const foundUser = await this.repo.findOneBy({ email: email });

    // hash the password
    // generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the salt and the hashed password
    const result = salt + '.' + hash.toString('hex');

    foundUser.password = result;

    await this.repo.save(foundUser);
  }

  async findOneById(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ user_id: id });
  }

  // async findOneByEmail(repoEmail: string) {
  //   if (!repoEmail) {
  //     return null;
  //   }
  //   return this.repo.findOneBy({ email: repoEmail });
  // }

  // async find(email: string) {
  //   const user = await this.repo.find({
  //     where: {
  //       email: email,
  //     },
  //   });
  //   return user;
  // }

  async create(body: SignupUserDto) {
    const user = this.repo.create(body);
    //    console.log(user);
    const savedUser = await this.repo.save(user);
    //    console.log(savedUser);
    return savedUser;
  }

  async signupUser(email: string, username, password: string) {
    const createUser = this.repo.create({ email, username, password });

    const user = await this.repo.save(createUser);

    return user;
  }

  async setPreferences(user: User, categories: Category[]) {
    user.Categories = categories;
    await this.repo.save(user);
    return user;
  }

  async getPreferences(user: User) {
    const userId = user.user_id;
    const preferences = await this.repo
      .createQueryBuilder()
      .select('category_id, category')
      .innerJoin('preferences', 'p', 'p.userUserId = user_id')
      .innerJoin('category', 'c', 'category_id = p.categoryCategoryId')
      .where('user_id = :userId', { userId })
      .getRawMany();

    console.log(preferences);

    return preferences;
    // return user.Categories;
  }

  async confirmEmailForPasswordReset(userEmail) {
    const foundUser = await this.repo.findOneBy({ email: userEmail });
    // console.log({{email}});
    if (foundUser == null) {
      return 'user not found';
    }

    // the below steps will make sure each user will have a unique password reset link that will contain their information in the token

    // https://www.npmjs.com/package/jsonwebtoken
    this.classUser = foundUser;
    const secret = process.env.JWTSecret + foundUser.password;
    const payload = {
      id: foundUser.user_id,
      email: foundUser.email,
      secret: secret,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '30s' });
    const link = `http://192.168.68.106:3000/users/forgot-password/${token}`;

    return link;
  }

  async confirmTokenLink(token: string, res: Response) {
    try {
      const jwt = this.jwtService.verify(token);
      console.log(`${this.classUser.email} I AM THE USER`);
      res.redirect('https://www.wejhatapp.com/reset-password');
    } catch (error) {
      console.log("I'm here");
      console.log(error.message);
    }
  }

  async favoritePlaces(user: UserDto, id: string) {
    // const usersFavorite = this.FavoritesRepo.create();
    // const place = await this.placesRepo.findOne(id);
    // const usersFavorites = await this.FavoritesRepo.find();
    // const filteredObject = usersFavorites.find((object) => {
    //   return (
    //     object['userId'] === user.user_id && object['placeId'] === parseInt(id)
    //   );
    // });
    // if (usersFavorites.length == 0 || !filteredObject) {
    //   usersFavorite.place = place;
    //   usersFavorite.placeId = parseInt(id);
    //   usersFavorite.user = user;
    //   usersFavorite.userId = user.user_id;
    //   this.FavoritesRepo.save(usersFavorite);
    // } else if (filteredObject) {
    //   const foundUF = await this.FavoritesRepo.findOne(
    //     filteredObject.usersFavoriteId,
    //   );
    //   foundUF.place = place;
    //   foundUF.user = user;
    //   this.FavoritesRepo.save(foundUF);
    // }
    // return this.repo.save(user);
  }

  async removeUserFavorite(user: UserDto, id: string) {
    const usersFavorites = await this.FavoritesRepo.find();

    const filteredObject = usersFavorites.find((object) => {
      return (
        object['userId'] === user.user_id && object['placeId'] === parseInt(id)
      );
    });

    await this.FavoritesRepo.remove(filteredObject);
  }

  async makeAdmin(user: User, session: any) {
    // const foundUser = await this.repo.findOne(user);
    // const adminUser = new Admin();
    // adminUser.user = foundUser;
    // session.admin = adminUser.user;
  }

  sendMail() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    this.mailService.sendMail({
      from: 'Khaled Alghamdi <5loodghamdi@gmail.com>',
      to: 'Khaled Alghamdi <5loodghamdi@gmail.com>',
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
  }

}
