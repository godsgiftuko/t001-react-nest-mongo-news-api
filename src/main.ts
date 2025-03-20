import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configs } from './configs';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'https://t001-react-nest-mongo-news-app.vercel.app', // Replace with your actual Vercel domain
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const PORT = Configs.SERVER_PORT;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
