import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ILike } from 'typeorm';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) { }

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universityService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universityService.remove(id);
  }



  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20
  ) {
      console.log("controller search:", search)
    return this.universityService.findAll(search, Number(page), Number(limit));
  }

}
