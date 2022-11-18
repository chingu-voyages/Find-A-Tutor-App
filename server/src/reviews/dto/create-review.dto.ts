import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  profileId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userId: number;
}
