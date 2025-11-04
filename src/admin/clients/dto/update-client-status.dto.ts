import { IsBoolean } from 'class-validator';
export class UpdateClientStatusDto {
  @IsBoolean()
  isActive: boolean;
}