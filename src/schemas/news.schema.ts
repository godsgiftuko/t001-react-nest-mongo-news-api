import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NewsTag } from './news_tag.schema';
import { INews } from '../types';

export type NewsDocument = HydratedDocument<News>;

@Schema()
export class News implements INews {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  image_url: string;

  @Prop()
  created_at: Date;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;

  @Prop()
  author_id: string;

  @Prop({ schema: NewsTag })
  tags: NewsTag[];
}

export const NewsSchema = SchemaFactory.createForClass(News);
