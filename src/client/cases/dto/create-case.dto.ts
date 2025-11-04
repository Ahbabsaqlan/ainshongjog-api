import { IsString, IsNotEmpty, MinLength, IsUUID } from 'class-validator';
export class CreateCaseDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @MinLength(20) description: string;
  @IsUUID() lawyerId: string; // Client chooses a lawyer when creating a case
}