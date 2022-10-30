import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ required: false, nullable: true })
  age?: number;

  @ApiProperty({ required: false, nullable: true })
  bio?: string;

  @ApiProperty({ required: false, nullable: true })
  subjects?: string;

  @ApiProperty({ required: false, nullable: true })
  rate?: number;

  @ApiProperty({ required: false, nullable: true })
  phone?: string;

  @ApiProperty({ required: false, nullable: true })
  city?: string;

  @ApiProperty({ required: false, nullable: true })
  state?: string;
}
