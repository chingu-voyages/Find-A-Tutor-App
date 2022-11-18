import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  text?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  @ApiProperty({ required: false, nullable: true })
  rating?: number;
}
