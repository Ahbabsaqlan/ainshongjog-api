import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from 'src/entities/consultation.entity';
import { LawyerScheduleController } from './schedule.controller';
import { LawyerScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation])],
  controllers: [LawyerScheduleController],
  providers: [LawyerScheduleService],
})
export class LawyerScheduleModule {}