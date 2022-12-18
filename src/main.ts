import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  await app.listen(3000);
}
bootstrap();
