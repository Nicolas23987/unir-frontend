import { PartialType } from '@nestjs/mapped-types';
import { CreateAmenitieDto } from './create-amenitie.dto';

export class UpdateAmenitieDto extends PartialType(CreateAmenitieDto) {}
