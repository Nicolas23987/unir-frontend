import { Module } from '@nestjs/common';
import { UniversityAreaService } from './university-area.service';
import { UniversityAreaController } from './university-area.controller';

@Module({
  controllers: [UniversityAreaController],
  providers: [UniversityAreaService],
})
export class UniversityAreaModule {}
