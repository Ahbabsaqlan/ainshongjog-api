// src/auth/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
// Ensure this import points directly to the entity file
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}