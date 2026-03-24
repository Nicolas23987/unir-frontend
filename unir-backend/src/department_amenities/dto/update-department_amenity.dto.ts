import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentAmenityDto } from './create-department_amenity.dto';

export class UpdateDepartmentAmenityDto extends PartialType(CreateDepartmentAmenityDto) {}
