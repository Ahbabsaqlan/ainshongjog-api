import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from 'src/entities/case.entity';
import { CaseUpdate } from 'src/entities/case-update.entity';
import { LawyerCasesController } from './cases.controller';
import { LawyerCasesService } from './cases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Case, CaseUpdate])],
  controllers: [LawyerCasesController],
  providers: [LawyerCasesService],
})
export class LawyerCasesModule {}