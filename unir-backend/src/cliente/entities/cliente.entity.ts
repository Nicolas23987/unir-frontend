import { Review } from 'src/reviews/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('cliente')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  picture: string;
  
  @Column({ type: 'varchar', length: 200, nullable: true })
  password: string 

  @Column({ type: 'boolean', default: false })
  isForaneo: boolean;

  @Column({ type: 'boolean', default: false })
  profileComplete: boolean;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: string | null;

  @OneToMany(() => Review, review => review.client)
  reviews: Review[];


}
