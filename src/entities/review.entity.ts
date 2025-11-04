import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Case } from './case.entity';
import { User } from '../auth/entities/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @OneToOne(() => Case, (caseEntity) => caseEntity.review, { onDelete: 'CASCADE' })
  @JoinColumn()
  case: Case;

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => User)
  lawyer: User;
}