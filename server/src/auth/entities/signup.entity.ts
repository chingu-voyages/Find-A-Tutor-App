import { ApiProperty } from '@nestjs/swagger';
import { AuthEntity } from './auth.entity';

export class SignUpEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: AuthEntity;
}
