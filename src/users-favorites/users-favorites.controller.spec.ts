import { Test, TestingModule } from '@nestjs/testing';
import { UsersFavoritesController } from './users-favorites.controller';

describe('UsersFavoritesController', () => {
  let controller: UsersFavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersFavoritesController],
    }).compile();

    controller = module.get<UsersFavoritesController>(UsersFavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
