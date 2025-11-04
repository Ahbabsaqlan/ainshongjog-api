// src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { LawyerProfile } from '../../entities/lawyer-profile.entity';

// 1. DEFINE AND EXPORT the enum here
export enum UserRole {
  ADMIN = 'ADMIN',
  LAWYER = 'LAWYER',
  CLIENT = 'CLIENT',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  // 2. USE the enum here
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @Column({ default: true }) // <<<--- ADD THIS LINE
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToOne(() => LawyerProfile, (profile) => profile.user)
  lawyerProfile: LawyerProfile;
}