import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { Amenitie } from "src/amenitie/entities/amenitie.entity";
import { Client } from "src/cliente/entities/cliente.entity";
import { Department } from "src/departament/entities/departament.entity";
import { DepartmentAmenity } from "src/department_amenities/entities/department_amenity.entity";
import { Review } from "src/reviews/entities/review.entity";
import { UniversityArea } from "src/university-area/entities/university-area.entity";
import { University } from "src/university/entities/university.entity";
import { UniversityGate } from "src/university/entities/UniversityGate";


dotenv.config()


export const Dbconfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432 ,
    username: process.env.UsName,
    password: String(process.env.Pass),
    database: 'unir',
    entities: [Client, Amenitie,Review, Department, DepartmentAmenity, University, UniversityArea, UniversityGate],
    synchronize: true,
}

