import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async create(createdUserDto: CreateUserDto) {
    const hashpassword: any = await bcrypt.hash(createdUserDto.password, 10);
    console.log(hashpassword);
    return await this.prisma.user.create({
      data: {
        ...createdUserDto,
        password: hashpassword,
      },
    });
  }
}
