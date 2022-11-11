import { ApiProperty } from '@nestjs/swagger';
import { AuthEntity } from './auth.entity';

export class SignInEntity {
  @ApiProperty({ default: 202 })
  statusCode: number;

  @ApiProperty()
  data: AuthEntity;
}
