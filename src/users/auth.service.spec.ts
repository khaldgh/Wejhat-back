import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('auth service', () => {
  let authService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
          const filteredUsers = users.filter(user => user.email === email);
          return Promise.resolve(filteredUsers);
      },
    //   findOne: (id: number) => {
    //     return Promise.resolve({
    //       id,
    //       email: 'm@m.com',
    //       password: '12345',
    //     });
    //   },
      signupUser: async (email: string, password: string) => {
        const user = {
          user_id: Math.floor(Math.random() * 99),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      // create: (body: UserDto) => {Promise.resolve({ id:1, body.email, body.password} as User);}
    };

    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it(' can create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signs up the user', async () => {
    const user = await authService.signup('kall@comm', 'some', 'some');
    expect(user.password).not.toEqual('some');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if wrong password was provided', async (done) => {
    await authService.signup('kall@com','some', 'pass');
    try{ 
        await authService.signin('kall@com', 'm')
    } catch(err){
        done();
    }
  });

//   it('throws an error if a user is already signed up', async (done) => {
//     await authService.signup('kall@comm', 'some');
//     try {
//       await authService.signup('kall@comm', 'some');
//     } catch (err) {
//       done();
//     }
//   });

  it('returns a user if correct password was provided', async () => {
    await authService.signup('kall@cam', 'some', 'pass');

    const user = await authService.signin('kall@cam', 'pass');
    expect(user).toBeDefined();
  });

});
