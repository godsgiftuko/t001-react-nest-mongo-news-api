import { IsNotEmpty, IsString } from 'class-validator';
import { NewsTag } from '../schemas/news_tag.schema';

export class CreateNewsTagDto extends NewsTag {
  @IsString()
  @IsNotEmpty()
  name: string;
}
