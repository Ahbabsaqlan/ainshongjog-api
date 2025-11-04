import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Case } from './case.entity';

@Entity('case_updates')
export class CaseUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  updateText: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.updates, { onDelete: 'CASCADE' })
  case: Case;
}