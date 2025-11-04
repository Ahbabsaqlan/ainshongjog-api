// src/entities/lawyer-profile.entity.ts

import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../auth/entities/user.entity';
// ADD THIS IMPORT LINE:
import { Specialization } from './specialization.entity';

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

@Entity('lawyer_profiles')
export class LawyerProfile {
  @PrimaryColumn('uuid')
  userId: string;

  @OneToOne(() => User, (user) => user.lawyerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ unique: true })
  barCouncilId: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: 0 })
  experienceYears: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consultationFee: number;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING })
  verificationStatus: VerificationStatus;
  
  // This will now work because Specialization is imported
  @ManyToMany(() => Specialization)
  @JoinTable()
  specializations: Specialization[];
}