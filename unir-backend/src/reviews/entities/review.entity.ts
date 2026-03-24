import { Client } from "src/cliente/entities/cliente.entity";
import { Department } from "src/departament/entities/departament.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";





@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, client => client.reviews)
    client: Client;

    @ManyToOne(() => Department, department => department.reviews)
    department: Department;

    @Column({ type: 'varchar', length: 100, nullable: true })
    comment: string;

    @Column({ type: 'int', nullable: true })
    rating: number;

}
