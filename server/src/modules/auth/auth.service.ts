import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async create(createdUserDto: CreateUserDto) {
            
            const hashpassword: any  = bcrypt.hash(createdUserDto.password, 10);
            return await this.prisma.user.create({ data:{
                firstName: createdUserDto.firstName,
                lastName: createdUserDto.lastName,
                email: createdUserDto.email,
                password: hashpassword,
                profile: null,
                role: createdUserDto.role,
            }
        })
    }
}

