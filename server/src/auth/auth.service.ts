import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';

interface UserJwtPayload {
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createdUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createdUserDto);

    if (createdUser) {
      const { id, role, email } = createdUser;
      const payload: UserJwtPayload = { email, id };
      const token: string = this.jwtService.sign(payload);

      return { user: { id, role, email }, token };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.usersService.findUserByEmail(signInUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }

    const { id, password, role, email } = user;

    const passwordMatch = bcrypt.compareSync(signInUserDto.password, password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }

    const payload: UserJwtPayload = { email, id };
    const token = this.jwtService.sign(payload);

    return { user: { id, role, email }, token };
  }
}
