import { Test, TestingModule } from '@nestjs/testing';
import { AmenitieService } from './amenitie.service';

describe('AmenitieService', () => {
  let service: AmenitieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmenitieService],
    }).compile();

    service = module.get<AmenitieService>(AmenitieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
