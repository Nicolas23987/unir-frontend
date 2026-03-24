import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentAmenitiesService } from './department_amenities.service';
import { CreateDepartmentAmenityDto } from './dto/create-department_amenity.dto';
import { UpdateDepartmentAmenityDto } from './dto/update-department_amenity.dto';

@Controller('department-amenities')
export class DepartmentAmenitiesController {
  constructor(private readonly departmentAmenitiesService: DepartmentAmenitiesService) {}

  @Post()
  create(@Body() createDepartmentAmenityDto: CreateDepartmentAmenityDto) {
    return this.departmentAmenitiesService.create(createDepartmentAmenityDto);
  }

  @Get()
  findAll() {
    return this.departmentAmenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentAmenitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentAmenityDto: UpdateDepartmentAmenityDto) {
    return this.departmentAmenitiesService.update(+id, updateDepartmentAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentAmenitiesService.remove(+id);
  }
}
