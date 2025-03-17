import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from './configs';
import { NewsModule } from './news/news.module';

@Module({
  imports: [MongooseModule.forRoot(Configs.MONGO_URL), NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
