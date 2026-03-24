import { Injectable } from '@nestjs/common';
import { CreateAmenitieDto } from './dto/create-amenitie.dto';
import { UpdateAmenitieDto } from './dto/update-amenitie.dto';

@Injectable()
export class AmenitieService {
  create(createAmenitieDto: CreateAmenitieDto) {
    return 'This action adds a new amenitie';
  }

  findAll() {
    return `This action returns all amenitie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} amenitie`;
  }

  update(id: number, updateAmenitieDto: UpdateAmenitieDto) {
    return `This action updates a #${id} amenitie`;
  }

  remove(id: number) {
    return `This action removes a #${id} amenitie`;
  }
}
