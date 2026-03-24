import { Injectable } from '@nestjs/common';
import { CreateUniversityAreaDto } from './dto/create-university-area.dto';
import { UpdateUniversityAreaDto } from './dto/update-university-area.dto';

@Injectable()
export class UniversityAreaService {
  create(createUniversityAreaDto: CreateUniversityAreaDto) {
    return 'This action adds a new universityArea';
  }

  findAll() {
    return `This action returns all universityArea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} universityArea`;
  }

  update(id: number, updateUniversityAreaDto: UpdateUniversityAreaDto) {
    return `This action updates a #${id} universityArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} universityArea`;
  }
}
