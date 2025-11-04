import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyerProfile } from 'src/entities/lawyer-profile.entity';
import { ClientLawyersController } from './lawyers.controller';
import { ClientLawyersService } from './lawyers.service';

@Module({
  imports: [TypeOrmModule.forFeature([LawyerProfile])],
  controllers: [ClientLawyersController],
  providers: [ClientLawyersService],
})
export class ClientLawyersModule {}