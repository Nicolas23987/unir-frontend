import { Amenitie } from "src/amenitie/entities/amenitie.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('department')
export class Department {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    title: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    location: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    price: string;

    @Column({ type: 'int', nullable: true })
    rating: number;

    @Column({ type: 'varchar', length: 200, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    type: string;

    @Column({ type: 'int', nullable: true })
    roommates: number;

    @ManyToMany(() => Amenitie, amenitie => amenitie.departaments)
    @JoinTable({
        name: 'department_amenities',
        joinColumn: { name: 'department_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'amenitie_id', referencedColumnName: 'id' }
    })
    amenities: Amenitie[];

    @Column({ type: 'float', nullable: true })
    lng: number;

    @Column({ type: 'float', nullable: true })
    lat: number;

    @OneToMany(() => Review, review => review.department)
    reviews: Review[];

}
