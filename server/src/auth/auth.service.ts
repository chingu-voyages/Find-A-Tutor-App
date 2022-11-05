import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(createdUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createdUserDto,
    });
  }
}
