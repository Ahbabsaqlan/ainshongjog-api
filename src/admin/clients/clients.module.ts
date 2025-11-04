import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AdminClientsController } from './clients.controller';
import { AdminClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminClientsController],
  providers: [AdminClientsService],
})
export class AdminClientsModule {}