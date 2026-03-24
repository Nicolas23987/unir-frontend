import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversityAreaDto } from './create-university-area.dto';

export class UpdateUniversityAreaDto extends PartialType(CreateUniversityAreaDto) {}
