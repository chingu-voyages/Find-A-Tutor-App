import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedResponseEntity } from './entities/UserCreatedResponse.entity';
import { SignInResponseEntity } from './entities/SignInResponse.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // return user and jwt for signin and signup

  @Post('signup')
  @ApiCreatedResponse({ type: UserCreatedResponseEntity })
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const signedUser = await this.authService.signUp(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: signedUser,
    });
  }

  @Post('signin')
  @ApiCreatedResponse({ type: SignInResponseEntity })
  async signIn(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    const signedUser = await this.authService.signIn(signInUserDto);

    return res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      data: signedUser,
    });
  }
}
