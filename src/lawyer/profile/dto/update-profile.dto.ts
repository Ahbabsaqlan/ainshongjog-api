import { IsString, IsOptional, IsNumber, Min, IsArray, IsInt } from 'class-validator';
export class UpdateProfileDto {
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsNumber() @Min(0) experienceYears?: number;
  @IsOptional() @IsNumber() consultationFee?: number;
  @IsOptional() @IsArray() @IsInt({ each: true }) specializationIds?: number[];
}