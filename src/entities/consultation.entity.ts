import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => User)
  lawyer: User;
  
  @Column('timestamptz')
  scheduledTime: Date;

  @Column()
  consultationFee: number;
}