import { UserDto } from 'src/users/dtos/signup_user.dto';
import { SerializeInterceptor } from './serialize.interceptor';

describe('SerializeInterceptor', () => {
  it('should be defined', () => {
    expect(new SerializeInterceptor(UserDto)).toBeDefined();
  });
});
