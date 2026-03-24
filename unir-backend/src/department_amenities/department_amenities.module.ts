import { Module } from '@nestjs/common';
import { DepartmentAmenitiesService } from './department_amenities.service';
import { DepartmentAmenitiesController } from './department_amenities.controller';

@Module({
  controllers: [DepartmentAmenitiesController],
  providers: [DepartmentAmenitiesService],
})
export class DepartmentAmenitiesModule {}
