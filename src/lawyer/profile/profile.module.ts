import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyerProfile } from 'src/entities/lawyer-profile.entity';
import { LawyerProfileController } from './profile.controller';
import { LawyerProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([LawyerProfile])],
  controllers: [LawyerProfileController],
  providers: [LawyerProfileService],
})
export class LawyerProfileModule {}