import { Test, TestingModule } from '@nestjs/testing';
import { AmenitieController } from './amenitie.controller';
import { AmenitieService } from './amenitie.service';

describe('AmenitieController', () => {
  let controller: AmenitieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmenitieController],
      providers: [AmenitieService],
    }).compile();

    controller = module.get<AmenitieController>(AmenitieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
