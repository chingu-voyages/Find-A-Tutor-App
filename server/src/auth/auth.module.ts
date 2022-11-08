import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';

// const jwtFactory = {
//   useFactory: async (configService: ConfigService) => ({
//     secret: configService.get<string>(process.env.JWT_SECRET),
//     signOptions: {
//       expiresIn: configService.get(process.env.JWT_EXP_H),
//     },
//   }),
//   inject: [ConfigService],
// };

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'verySecretSecretShhhhh',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
