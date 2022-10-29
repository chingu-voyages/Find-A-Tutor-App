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
    UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedResponseEntity } from './entities/UserCreatedResponse.entity';
import { SignInResponseEntity } from './entities/SignInResponse.entity'
import { JwtService } from '@nestjs/jwt';



export interface UserJwtPayload {
    username: string;
    typeid: number;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    @Post('create')
    @ApiCreatedResponse({ type: UserCreatedResponseEntity })
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const createdUser = await this.usersService.create(createUserDto);

        console.log(createdUser)

        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            data: createdUser,
        });
    }

    @Post('signin')
    @ApiCreatedResponse({ type: SignInResponseEntity })
    async signin(@Body() signInUserDto: SignInUserDto):Promise<{ accessMessage: string }>  {
        const user: any = await this.usersService.checkEmailExists(signInUserDto.email)

        // const { password } = user

        const username = signInUserDto.email

        // bcrypt.compare(signInUserDto.password, password, function(err, result) {
        //     if(err) {
        //         console.log(err);
        //     }
        //     if(result) {
        //         return true
        //     }
        // });

        if (!user) {
            throw new HttpException("invalid_credentials",  
                HttpStatus.UNAUTHORIZED);
        }


        if (user) {
            const typeid = user.id;
            const payload: UserJwtPayload = { username, typeid };
            const accessMessage: string = await this.jwtService.sign(payload);
            // console.log(accessMessage)
            return { accessMessage } ;
        } else {
            throw new UnauthorizedException('Incorrect login credentials!');
        }
    }
}
