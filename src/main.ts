import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configs } from './configs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const PORT = Configs.SERVER_PORT;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
