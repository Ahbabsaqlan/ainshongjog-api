import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from 'src/entities/consultation.entity';
import { ClientConsultationsController } from './consultations.controller';
import { ClientConsultationsService } from './consultations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation])],
  controllers: [ClientConsultationsController],
  providers: [ClientConsultationsService],
})
export class ClientConsultationsModule {}