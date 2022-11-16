import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check/lib';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, nullable: true })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Validate(PasswordValidation, [passwordRequirement])
  @ApiProperty({ required: false, nullable: true })
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'role must be STUDENT or TUTOR' })
  @IsString()
  @ApiProperty({
    required: false,
    nullable: true,
    type: String,
    enum: Role,
    default: 'STUDENT',
  })
  role: Role;
}
