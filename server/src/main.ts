import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: 'http://localhost:3000' });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('bears-db')
    .setDescription('Route testing and visual interface')
    .setVersion('1.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(PORT);
}
bootstrap();
