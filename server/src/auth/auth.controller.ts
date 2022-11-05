import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedResponseEntity } from './entities/UserCreatedResponse.entity';
import { SignInResponseEntity } from './entities/SignInResponse.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface UserJwtPayload {
  email: string;
  userId: number;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  // return user and jwt for signin and signup

  @Post('signup')
  @ApiCreatedResponse({ type: UserCreatedResponseEntity })
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const userExists = await this.usersService.findUserByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ConflictException('this email already exists');
    }

    const saltRounds = 10;
    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      saltRounds,
    );

    const createdUser = await this.usersService.create(createUserDto);

    const { id: userId, role, email } = createdUser;

    if (createdUser) {
      const payload: UserJwtPayload = { email, userId };
      const token: string = this.jwtService.sign(payload);

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: { user: { id: userId, role, email }, token },
      });
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }

  @Post('signin')
  @ApiCreatedResponse({ type: SignInResponseEntity })
  async signin(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    const user = await this.usersService.findUserByEmail(signInUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }

    const { password, role, email } = user;

    const passwordMatch = await bcrypt.compare(
      signInUserDto.password,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }

    const userId = user.id;
    const payload: UserJwtPayload = { email, userId };
    const token = this.jwtService.sign(payload);

    return res.status(HttpStatus.ACCEPTED).json({
      statusCode: HttpStatus.ACCEPTED,
      data: { user: { id: userId, role, email }, token },
    });
  }
}
