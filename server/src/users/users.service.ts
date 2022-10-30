import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        profile: {
          create: createUserDto.profile,
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({ include: { profile: true } });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });
  }

  async findAllStudents() {
    return await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: { profile: true },
    });
  }

  async findAllTutors() {
    return await this.prisma.user.findMany({
      where: { role: 'TUTOR' },
      include: { profile: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.prisma.profile.delete({ where: { userId: id } });
    return await this.prisma.user.delete({ where: { id: id } });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }
}
