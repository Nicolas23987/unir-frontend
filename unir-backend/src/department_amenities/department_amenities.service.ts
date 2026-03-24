import { Injectable } from '@nestjs/common';
import { CreateDepartmentAmenityDto } from './dto/create-department_amenity.dto';
import { UpdateDepartmentAmenityDto } from './dto/update-department_amenity.dto';

@Injectable()
export class DepartmentAmenitiesService {
  create(createDepartmentAmenityDto: CreateDepartmentAmenityDto) {
    return 'This action adds a new departmentAmenity';
  }

  findAll() {
    return `This action returns all departmentAmenities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departmentAmenity`;
  }

  update(id: number, updateDepartmentAmenityDto: UpdateDepartmentAmenityDto) {
    return `This action updates a #${id} departmentAmenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} departmentAmenity`;
  }
}
