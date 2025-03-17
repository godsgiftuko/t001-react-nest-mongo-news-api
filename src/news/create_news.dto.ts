import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { News } from 'src/schemas/news.schema';

export class CreateNewsDto extends News {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  tagIds: string[];
}
