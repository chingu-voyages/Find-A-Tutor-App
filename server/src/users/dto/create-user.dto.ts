import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

class PartialProfile {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false, nullable: true })
  age?: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  bio?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  subjects?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  edLevel?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  rate?: number | null;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('US')
  @ApiProperty({ required: false, nullable: true })
  phone?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  city?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  state?: string | null;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    required: false,
    nullable: true,
    default: 'https://placeimg.com/192/192/people',
  })
  profileUrl?: string | null;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Validate(PasswordValidation, [passwordRequirement])
  @ApiProperty()
  password: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PartialProfile)
  @ApiProperty()
  profile: PartialProfile;

  @IsEnum(Role, { message: 'role must be STUDENT or TUTOR' })
  @IsString()
  @ApiProperty({ enum: ['STUDENT', 'TUTOR'], default: 'STUDENT' })
  role: Role;
}
