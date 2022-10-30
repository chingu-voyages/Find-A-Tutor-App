import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ required: false, nullable: true })
  age?: number | null;

  @ApiProperty({ required: false, nullable: true })
  bio?: string | null;

  @ApiProperty({ required: false, nullable: true })
  subjects?: string | null;

  @ApiProperty({ required: false, nullable: true })
  rate?: number | null;

  @ApiProperty({ required: false, nullable: true })
  phone?: string | null;

  @ApiProperty({ required: false, nullable: true })
  city?: string | null;

  @ApiProperty({ required: false, nullable: true })
  state?: string | null;
}
