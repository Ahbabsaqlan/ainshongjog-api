// src/auth/auth.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';
import { LawyerProfile } from '../entities/lawyer-profile.entity'; // <-- Import LawyerProfile
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // 1. Inject BOTH repositories
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(LawyerProfile)
    private profileRepository: Repository<LawyerProfile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'passwordHash'>> {
    const { email, password, fullName, role } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      fullName,
      email,
      passwordHash: hashedPassword,
      role,
    });

    const savedUser = await this.userRepository.save(newUser);

    // --- NEW LOGIC TO AUTOMATICALLY CREATE LAWYER PROFILE ---
    // 2. Check if the new user is a lawyer
    if (savedUser.role === UserRole.LAWYER) {
      // 3. Create a new, empty profile linked to this user
      const newProfile = this.profileRepository.create({
        user: savedUser, // This establishes the TypeORM relation
        // The barCouncilId is NOT NULL, so we need a placeholder
        barCouncilId: `TEMP-BCID-${savedUser.id}`, 
      });
      await this.profileRepository.save(newProfile);
    }
    // --- END OF NEW LOGIC ---

    const { passwordHash, ...userResponse } = savedUser;
    return userResponse;
  }
}