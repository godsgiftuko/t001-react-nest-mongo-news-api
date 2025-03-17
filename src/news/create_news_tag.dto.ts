import { IsNotEmpty, IsString } from 'class-validator';
import { NewsTag } from 'src/schemas/news_tag.schema';

export class CreateNewsTagDto extends NewsTag {
  @IsString()
  @IsNotEmpty()
  name: string;
}
