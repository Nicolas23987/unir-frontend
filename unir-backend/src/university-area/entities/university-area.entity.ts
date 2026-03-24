import { University } from "src/university/entities/university.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('university_area')
export class UniversityArea {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Polygon',
        srid: 4326
    })
    area: string;

    @OneToOne(() => University, university => university.area)
    @JoinColumn({ name: 'university_id' })
    university: University;
}