import { Test, TestingModule } from '@nestjs/testing';
import { UsersFavoritesService } from './users-favorites.service';

describe('UsersFavoritesService', () => {
  let service: UsersFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersFavoritesService],
    }).compile();

    service = module.get<UsersFavoritesService>(UsersFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
