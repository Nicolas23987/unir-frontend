import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/departament.entity';

@Injectable()
export class DepartamentService {

  constructor(
    @InjectRepository(Department)
    private readonly departamentRepository: Repository<Department>,
  ) {}

  async create(createDepartamentDto: CreateDepartamentDto) {
    const departament = this.departamentRepository.create(createDepartamentDto);
    return await this.departamentRepository.save(departament);
  }

  async findAll() {
    return await this.departamentRepository.find({
        relations: ['reviews', 'amenities']
    });
  }

  async findOne(id: string) {
    const departament = await this.departamentRepository.findOne({
      where: { id }
    });

    if (!departament) {
      throw new NotFoundException(`Departament with id ${id} not found`);
    }

    return departament;
  }

  async update(id: string, updateDepartamentDto: UpdateDepartamentDto) {
    const departament = await this.findOne(id);

    const updated = this.departamentRepository.merge(
      departament,
      updateDepartamentDto,
    );

    return await this.departamentRepository.save(updated);
  }

  async remove(id: string) {
    const departament = await this.findOne(id);
    return await this.departamentRepository.remove(departament);
  }


  
}