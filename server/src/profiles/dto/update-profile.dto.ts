import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  lastName?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ required: false, nullable: true })
  age?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  bio?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  subjects?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  edLevel?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  rate?: number;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('US')
  @ApiProperty({ required: false, nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  state?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    required: false,
    nullable: true,
    default: 'https://placeimg.com/192/192/people',
  })
  profileUrl?: string;
}
