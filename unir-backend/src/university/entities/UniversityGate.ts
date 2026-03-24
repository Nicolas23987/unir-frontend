import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { University } from "./university.entity";


@Entity('university_gate')
export class UniversityGate {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string;

    @ManyToOne(() => University, university => university.area)
    @JoinColumn({ name: 'university_id' })
    university: University;

}      