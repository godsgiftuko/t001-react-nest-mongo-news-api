import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsTag } from '../schemas/news_tag.schema';
import { CreateNewsTagDto } from './create_news_tag.dto';
import { Pagination } from '../utils/pagination';

@Injectable()
export class NewsTagService {
  constructor(
    @InjectModel(NewsTag.name) private newsTagModel: Model<NewsTag>,
  ) {}

  async create(createNewsTagDto: CreateNewsTagDto): Promise<NewsTag> {
    try {
      const exist = await this.newsTagModel.findOne({
        name: createNewsTagDto.name,
      });
      if (exist) {
        throw new HttpException('Tag already exist', HttpStatus.CONFLICT);
      }
      return await this.newsTagModel.create(createNewsTagDto);
    } catch (e) {
      throw e;
    }
  }

  async fetchMany(pagination: Pagination): Promise<NewsTag[]> {
    try {
      return await this.newsTagModel
        .find()
        .sort({ createdAt: pagination.order === 'DESC' ? -1 : 1 })
        .limit(parseInt(pagination.limit || '10'));
    } catch (e) {
      throw e;
    }
  }

  async fetchById(id: string): Promise<NewsTag> {
    try {
      return await this.newsTagModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async delById(id: string): Promise<string> {
    try {
      await this.newsTagModel.findByIdAndDelete(id);
      return 'News Tag deleted';
    } catch (e) {
      throw e;
    }
  }
}
