import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { University } from './entities/university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {

  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,

  ) { }
  private logger = new Logger(UniversityService.name);

  async create(createUniversityDto: CreateUniversityDto) {
    const university = this.universityRepository.create(createUniversityDto);
    return await this.universityRepository.save(university);
  }

  async findAll(search?: string, page = 1, limit = 20) {
    this.logger.log(search);
    if (!search || search.length < 2) {
      return {
        data: [],
        total: 0,
        page,
        last_page: 0,
      }
    }

    const skip = (page - 1) * limit;

    const [data, total] = await this.universityRepository.findAndCount({
      relations: ['gates', 'area'],
      where: search
        ? { name: ILike(`%${search}%`) }
        : {},
      take: limit,
      skip,
      order: {
      name: 'ASC'
      }
    });

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    }

  }

  async findOne(id: string) {
    return await this.universityRepository.findOne({
      where: { id },
      relations: ['university_gate', 'university_area'],
    });
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    await this.universityRepository.update(id, updateUniversityDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.universityRepository.delete(id);
  }




}