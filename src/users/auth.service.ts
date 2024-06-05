// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { randomBytes, scrypt as _scrypt } from 'crypto';
// import { promisify } from 'util';

// const scrypt = promisify(_scrypt);

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService) {}

//   async signup(email: string, username: string, password: string) {
//     // see if the email is already in use
//     const users = await this.usersService.find(email);
//     if (users.length) {
//       throw new BadRequestException('user already in use');
//     }
//     if(password.length <= 0){
//       throw new BadRequestException('password is too short');
//     }
//     // hash the password
//     // generate a salt
//     const salt = randomBytes(8).toString('hex');

//     // hash the salt and the password
//     const hash = (await scrypt(password, salt, 32)) as Buffer;

//     // join the salt and the hashed password
//     const result = salt + '.' + hash.toString('hex');

//     // create the user and save it
//     const user = await this.usersService.signupUser(email, username, result);

//     // return the user
//     return user;
//   }

//   async signin(email: string, password: string) {
//     const [user] = await this.usersService.find(email);
//     // console.log(user);
//     if (!user) {
//       throw new NotFoundException('user not found');
//     }

//     const [salt, storedHash] = user.password.split('.');

//     const hash = (await scrypt(password, salt, 32)) as Buffer;

//     if (storedHash !== hash.toString('hex')) {
//       throw new NotFoundException('wrong password');
//     }
//     return user;
//   }

//   async passwordReset(email: string, password: string) {
//     const foundUser = await this.usersService.findOneByEmail(email);

//         // hash the password
//     // generate a salt
//     const salt = randomBytes(8).toString('hex');

//     // hash the salt and the password
//     const hash = (await scrypt(password, salt, 32)) as Buffer;

//     // join the salt and the hashed password
//     const result = salt + '.' + hash.toString('hex');

//     foundUser.password = result;
//   }
// }
