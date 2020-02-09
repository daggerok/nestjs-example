import { Test, TestingModule } from '@nestjs/testing';
import { MaksimkoService } from './maksimko.service';

describe('MaksimkoService', () => {
  let service: MaksimkoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaksimkoService],
    }).compile();

    service = module.get<MaksimkoService>(MaksimkoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
