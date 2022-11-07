import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
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
