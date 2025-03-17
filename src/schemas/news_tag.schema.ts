import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { INewsTag } from '../types';

export type NewsTagDocument = HydratedDocument<NewsTag>;

@Schema()
export class NewsTag implements INewsTag {
  @Prop()
  name: string;
}

export const NewsTagSchema = SchemaFactory.createForClass(NewsTag);
