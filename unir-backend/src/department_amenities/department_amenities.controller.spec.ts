import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentAmenitiesController } from './department_amenities.controller';
import { DepartmentAmenitiesService } from './department_amenities.service';

describe('DepartmentAmenitiesController', () => {
  let controller: DepartmentAmenitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentAmenitiesController],
      providers: [DepartmentAmenitiesService],
    }).compile();

    controller = module.get<DepartmentAmenitiesController>(DepartmentAmenitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
