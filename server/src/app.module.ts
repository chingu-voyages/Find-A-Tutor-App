import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config();
// set up a .env file in server folder with the following env variables
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PASSWORD);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      // your username
      username: DB_USERNAME,
      // your password
      password: DB_PASSWORD,
      database: 'test',
      entities: [],
      // set to false during production
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
