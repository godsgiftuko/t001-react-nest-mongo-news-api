import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './create_news.dto';
import { CreateNewsTagDto } from './create_news_tag.dto';
import { NewsTagService } from './news_tag.service';
import { Pagination } from 'src/utils/pagination';

@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private newsTagService: NewsTagService,
  ) {}

  @Post()
  createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get('/id/:id')
  getNewsById(
    @Param('id') id: string,
    @Query('countView', ParseBoolPipe) countView: boolean,
  ) {
    if (countView) {
      return this.newsService.incrementViews(id);
    }
    return this.newsService.fetchById(id);
  }

  @Get()
  getManyNews() {
    return this.newsService.fetchMany();
  }

  @Delete('/id/:id')
  delNewsById(@Param('id') id: string) {
    return this.newsService.delById(id);
  }

  @Patch('/likes/:id')
  incrementLikes(@Param('id') id: string) {
    return this.newsService.incrementLikes(id);
  }

  @Patch('/dislike/:id')
  incrementDislikes(@Param('id') id: string) {
    return this.newsService.incrementDislikes(id);
  }

  @Post('/tags')
  createNewsTag(@Body() createNewsTagDto: CreateNewsTagDto) {
    return this.newsTagService.create(createNewsTagDto);
  }

  @Get('/tags/:id')
  getNewsTagById(@Param('id') id: string) {
    return this.newsTagService.fetchById(id);
  }

  @Get('tags')
  getManyNewsTag(@Query() pagination: Pagination) {
    return this.newsTagService.fetchMany(pagination);
  }

  @Delete('/tags/:id')
  delNewsTagById(@Param('id') id: string) {
    return this.newsTagService.delById(id);
  }
}
