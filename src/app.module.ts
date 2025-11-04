// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminLawyersModule } from './admin/lawyers/lawyers.module';
import { AdminClientsModule } from './admin/clients/clients.module';
import { LawyerProfileModule } from './lawyer/profile/profile.module';
import { LawyerCasesModule } from './lawyer/cases/cases.module';
import { LawyerScheduleModule } from './lawyer/schedule/schedule.module';
import { ClientLawyersModule } from './client/lawyers/lawyers.module';
import { ClientCasesModule } from './client/cases/cases.module';
import { ClientConsultationsModule } from './client/consultations/consultations.module';
// Don't forget your AuthModule and config modules from before
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    AdminLawyersModule,
    AdminClientsModule,
    LawyerProfileModule,
    LawyerCasesModule,
    LawyerScheduleModule,
    ClientLawyersModule,
    ClientCasesModule,
    ClientConsultationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}