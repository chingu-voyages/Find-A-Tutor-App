import { SignInEntity } from './signin.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseEntity {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  data: string;
}