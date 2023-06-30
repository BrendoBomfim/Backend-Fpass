import { Test, TestingModule } from '@nestjs/testing';
import { MarvelApiController } from './marvel-api.controller';
import { MarvelApiService } from './marvel-api.service';

describe('MarvelApiController', () => {
  let controller: MarvelApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarvelApiController],
      providers: [MarvelApiService],
    }).compile();

    controller = module.get<MarvelApiController>(MarvelApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
