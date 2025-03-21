import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../schemas/news.schema';
import { CreateNewsDto } from './create_news.dto';
import { NewsTag } from '../schemas/news_tag.schema';
import { Pagination } from '../utils/pagination';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<News>,
    @InjectModel(NewsTag.name) private newsTagModel: Model<NewsTag>,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    try {
      const tags = await this.newsTagModel.find();
      const tagsToAdd: NewsTag[] = [];
      const tagExist = (id: string) =>
        tags.find((tag) => tag._id.toString() === id);

      for (const tagId of createNewsDto.tagIds) {
        const tag = tagExist(tagId);
        if (!tag) {
          throw new HttpException(
            `Invalid tag "${tagId}"`,
            HttpStatus.BAD_REQUEST,
          );
        }
        tagsToAdd.push(tag);
      }

      return await this.newsModel.create({
        ...createNewsDto,
        created_at: new Date(),
        author_id: '1',
        tags: tagsToAdd,
      });
    } catch (e) {
      throw e;
    }
  }

  async fetchMany(pagination: Pagination): Promise<News[]> {
    try {
      return await this.newsModel
        .find()
        .sort({ createdAt: pagination.order === 'DESC' ? -1 : 1 })
        .limit(parseInt(pagination.limit || '10'));
    } catch (e) {
      throw e;
    }
  }

  async fetchById(id: string): Promise<News> {
    try {
      return await this.newsModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async delById(id: string): Promise<string> {
    try {
      await this.newsModel.findByIdAndDelete(id);
      return 'News deleted';
    } catch (e) {
      throw e;
    }
  }

  async incrementLikes(id: string): Promise<News> {
    try {
      const news = await this.fetchById(id);
      if (!news) {
        throw new HttpException(
          'News is no longer available',
          HttpStatus.BAD_REQUEST,
        );
      }
      news.likes = news.likes + 1;
      await this.newsModel.findByIdAndUpdate(id, {
        $set: {
          likes: news.likes,
        },
      });
      return news;
    } catch (e) {
      throw e;
    }
  }

  async incrementDislikes(id: string): Promise<News> {
    try {
      const news = await this.fetchById(id);
      if (!news) {
        throw new HttpException(
          'News is no longer available',
          HttpStatus.BAD_REQUEST,
        );
      }
      news.dislikes = news.dislikes + 1;
      await this.newsModel.findByIdAndUpdate(id, {
        $set: {
          dislikes: news.dislikes,
        },
      });
      return news;
    } catch (e) {
      throw e;
    }
  }

  async incrementViews(id: string): Promise<News> {
    try {
      const news = await this.fetchById(id);
      if (!news) {
        throw new HttpException(
          'News is no longer available',
          HttpStatus.BAD_REQUEST,
        );
      }
      news.views = news.views + 1;
      await this.newsModel.findByIdAndUpdate(id, {
        $set: {
          views: news.views,
        },
      });
      return news;
    } catch (e) {
      throw e;
    }
  }
}
