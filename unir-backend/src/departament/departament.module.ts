import { Module } from '@nestjs/common';
import { DepartamentService } from './departament.service';
import { DepartamentController } from './departament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/departament.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Amenitie } from 'src/amenitie/entities/amenitie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Review, Amenitie])],
  exports: [ TypeOrmModule ],
  controllers: [DepartamentController],
  providers: [DepartamentService],
})
export class DepartamentModule {}
