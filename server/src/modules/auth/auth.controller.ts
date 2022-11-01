import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
  HttpStatus,
  ParseIntPipe,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
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
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createdUser = await this.authService.create(createUserDto);

    // console.log(createdUser);

    const { id: userId, role, email } = createdUser;

    if (createdUser) {
      const typeid = createdUser.id;
      const payload: UserJwtPayload = { email, userId };
      const token: string = await this.jwtService.sign(payload);
      // console.log(token);
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
    const user: any = await this.usersService.findUserByEmail(
      signInUserDto.email,
    );

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password, role, email  } = user;

    bcrypt.compare(signInUserDto.password, password, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        return true;
      }
    });

    if (user) {
      const userId = user.id;
      const payload: UserJwtPayload = { email, userId };
      const token: string = await this.jwtService.sign(payload);
    //   console.log(token);
      return res.status(HttpStatus.ACCEPTED).json({
        statusCode: HttpStatus.ACCEPTED,
        data: { user: { id: userId, role, email }, token },
      });
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }
}
