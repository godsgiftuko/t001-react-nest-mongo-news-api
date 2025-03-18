import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from '../schemas/news.schema';
import { NewsTag, NewsTagSchema } from '../schemas/news_tag.schema';
import { NewsTagService } from './news_tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: NewsTag.name, schema: NewsTagSchema },
    ]),
  ],
  providers: [NewsService, NewsTagService],
  controllers: [NewsController],
})
export class NewsModule {}
