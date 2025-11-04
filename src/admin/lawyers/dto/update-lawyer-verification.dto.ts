import { IsEnum, IsOptional, IsString } from 'class-validator';
export enum VerificationStatus { VERIFIED = 'VERIFIED', REJECTED = 'REJECTED' }
export class UpdateLawyerVerificationDto {
  @IsEnum(VerificationStatus)
  status: VerificationStatus;
  @IsOptional() @IsString() remarks?: string;
}