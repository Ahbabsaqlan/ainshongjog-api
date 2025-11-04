import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CaseUpdate } from './case-update.entity';
import { Review } from './review.entity';

export enum CaseStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: CaseStatus, default: CaseStatus.OPEN })
  status: CaseStatus;

  @ManyToOne(() => User, { eager: true }) // eager loads the client info
  client: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  lawyer: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CaseUpdate, (update) => update.case)
  updates: CaseUpdate[];

  @OneToOne(() => Review, (review) => review.case)
  review: Review;
}