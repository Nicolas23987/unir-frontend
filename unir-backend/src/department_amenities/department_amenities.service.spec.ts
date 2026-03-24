import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentAmenitiesService } from './department_amenities.service';

describe('DepartmentAmenitiesService', () => {
  let service: DepartmentAmenitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentAmenitiesService],
    }).compile();

    service = module.get<DepartmentAmenitiesService>(DepartmentAmenitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
