import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCaseUpdateDto {
  @IsString()
  @IsNotEmpty()
  updateText: string;
}