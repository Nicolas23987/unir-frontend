import { UniversityArea } from "src/university-area/entities/university-area.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UniversityGate } from "./UniversityGate";


@Entity()
export class University {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    city: string;

    @OneToMany(() => UniversityArea, universityArea => universityArea.university)
    area: UniversityArea[];

    @OneToMany(() => UniversityGate, universityGate => universityGate.university)
    gates: UniversityGate[];
}
