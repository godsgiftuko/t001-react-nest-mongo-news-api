import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configs } from './configs';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

const allowedOrigins = [
  'https://t001-react-nest-mongo-news-app.vercel.app',
  'http://localhost:5173',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   cors({
  //     origin: (origin, callback) => {
  //       if (!origin || allowedOrigins.includes(origin)) {
  //         callback(null, true);
  //       } else {
  //         callback(new Error('Not allowed by CORS'));
  //       }
  //     },
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     credentials: true,
  //   }),
  // );
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const PORT = Configs.SERVER_PORT;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
