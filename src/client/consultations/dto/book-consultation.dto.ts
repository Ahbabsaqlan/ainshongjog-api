import { IsUUID, IsDateString } from 'class-validator';
export class BookConsultationDto {
  @IsUUID() lawyerId: string;
  @IsDateString() scheduledTime: string;
}