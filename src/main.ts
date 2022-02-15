import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // to tell nestjs that we use pipes we don't have to define it in any controller
  app.useGlobalInterceptors(new TransformInterceptor()); // to hide user data when creating task
  await app.listen(3000);
}
bootstrap();
