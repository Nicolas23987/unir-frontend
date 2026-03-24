import { Test, TestingModule } from '@nestjs/testing';
import { UniversityAreaService } from './university-area.service';

describe('UniversityAreaService', () => {
  let service: UniversityAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversityAreaService],
    }).compile();

    service = module.get<UniversityAreaService>(UniversityAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
