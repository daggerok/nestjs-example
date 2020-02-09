import { Test, TestingModule } from '@nestjs/testing';
import { MaksimkoController } from './maksimko.controller';

describe('Maksimko Controller', () => {
  let controller: MaksimkoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaksimkoController],
    }).compile();

    controller = module.get<MaksimkoController>(MaksimkoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
