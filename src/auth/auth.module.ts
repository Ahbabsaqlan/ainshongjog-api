// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LawyerProfile } from '../entities/lawyer-profile.entity'; // <-- 1. Import LawyerProfile

@Module({
  // 2. Give this module access to both User and LawyerProfile repositories
  imports: [TypeOrmModule.forFeature([User, LawyerProfile])], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}