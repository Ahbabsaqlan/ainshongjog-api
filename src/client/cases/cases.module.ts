import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from 'src/entities/case.entity';
import { Review } from 'src/entities/review.entity';
import { ClientCasesController } from './cases.controller';
import { ClientCasesService } from './cases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Case, Review])],
  controllers: [ClientCasesController],
  providers: [ClientCasesService],
})
export class ClientCasesModule {}