import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useRequestLogging } from './middlewares/logger.middlewares';
import { TransformInterceptor } from './utils/transform.interceptor';
async function bootstrap() {
  const { PORT } = process.env;

  const app: INestApplication = await NestFactory.create(AppModule);
  useRequestLogging(app);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT);
}
bootstrap();
