import { Department } from "src/departament/entities/departament.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";


@Entity('amenitie')
export class Amenitie {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    title: string;

    @Column()
    icon: string;

    @ManyToMany(() => Department, department => department.amenities)
    departaments: Department[];

}
