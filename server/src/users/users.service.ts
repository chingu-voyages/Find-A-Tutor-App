import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findUserByEmail(createUserDto.email);

    if (userExists) {
      throw new ConflictException('this email already exists');
    }

    createUserDto.password = this.hashPassword(createUserDto.password);

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
    const users = await this.prisma.user.findMany({
      include: { profile: true },
    });

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  async findAllStudents() {
    const students = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: { profile: true },
    });

    if (!students.length) {
      throw new NotFoundException('No students found');
    }

    return students;
  }

  async findAllTutors() {
    const tutors = await this.prisma.user.findMany({
      where: { role: 'TUTOR' },
      include: { profile: true },
    });

    if (!tutors.length) {
      throw new NotFoundException('No tutors found');
    }

    return tutors;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException(
        `User with id: ${id} not found. Could not update.`,
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: number) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const deletedUser = await this.prisma.user.delete({
      where: { id: id },
      include: { profile: true },
    });

    return deletedUser;
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }

  hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
}
