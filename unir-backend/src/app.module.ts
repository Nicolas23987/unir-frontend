import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dbconfig } from './App/config/Db.conf';
import { ConfigModule } from '@nestjs/config';
import { DepartamentModule } from './departament/departament.module';
import { AmenitieModule } from './amenitie/amenitie.module';
import { DepartmentAmenitiesModule } from './department_amenities/department_amenities.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UniversityModule } from './university/university.module';
import { UniversityAreaModule } from './university-area/university-area.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ClienteModule,
    TypeOrmModule.forRoot(Dbconfig),
    DepartamentModule,
    AmenitieModule,
    DepartmentAmenitiesModule,
    ReviewsModule,
    UniversityModule,
    UniversityAreaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
                                                                                                                                                                                                                                                                     