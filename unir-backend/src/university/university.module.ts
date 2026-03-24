import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { UniversityGate } from './entities/UniversityGate';
import { UniversityArea } from 'src/university-area/entities/university-area.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([University, UniversityGate, UniversityArea]) ],
  exports: [ TypeOrmModule ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
