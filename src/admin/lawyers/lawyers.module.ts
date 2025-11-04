import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { LawyerProfile } from 'src/entities/lawyer-profile.entity';
import { AdminLawyersController } from './lawyers.controller';
import { AdminLawyersService } from './lawyers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, LawyerProfile])],
  controllers: [AdminLawyersController],
  providers: [AdminLawyersService],
})
export class AdminLawyersModule {}