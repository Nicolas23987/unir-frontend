// src/auth/dto/update-profile.dto.ts
import { IsOptional, IsBoolean, IsString, IsDateString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsBoolean()
  isForaneo?: boolean;

  @IsOptional()
  @IsBoolean()
  profileComplete?: boolean;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;
}
