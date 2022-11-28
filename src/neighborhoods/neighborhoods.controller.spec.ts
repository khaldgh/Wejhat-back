import { Test, TestingModule } from '@nestjs/testing';
import { NeighborhoodsController } from './neighborhoods.controller';

describe('NeighborhoodsController', () => {
  let controller: NeighborhoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeighborhoodsController],
    }).compile();

    controller = module.get<NeighborhoodsController>(NeighborhoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
