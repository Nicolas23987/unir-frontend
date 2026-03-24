import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniversityAreaService } from './university-area.service';
import { CreateUniversityAreaDto } from './dto/create-university-area.dto';
import { UpdateUniversityAreaDto } from './dto/update-university-area.dto';

@Controller('university-area')
export class UniversityAreaController {
  constructor(private readonly universityAreaService: UniversityAreaService) {}

  @Post()
  create(@Body() createUniversityAreaDto: CreateUniversityAreaDto) {
    return this.universityAreaService.create(createUniversityAreaDto);
  }

  @Get()
  findAll() {
    return this.universityAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universityAreaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversityAreaDto: UpdateUniversityAreaDto) {
    return this.universityAreaService.update(+id, updateUniversityAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universityAreaService.remove(+id);
  }
}
