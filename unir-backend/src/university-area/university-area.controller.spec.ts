import { Test, TestingModule } from '@nestjs/testing';
import { UniversityAreaController } from './university-area.controller';
import { UniversityAreaService } from './university-area.service';

describe('UniversityAreaController', () => {
  let controller: UniversityAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityAreaController],
      providers: [UniversityAreaService],
    }).compile();

    controller = module.get<UniversityAreaController>(UniversityAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
