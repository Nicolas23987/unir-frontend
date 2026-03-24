import { Module } from '@nestjs/common';
import { AmenitieService } from './amenitie.service';
import { AmenitieController } from './amenitie.controller';

@Module({
  controllers: [AmenitieController],
  providers: [AmenitieService],
})
export class AmenitieModule {}
