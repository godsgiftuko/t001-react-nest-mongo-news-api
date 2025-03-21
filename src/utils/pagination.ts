import { IsOptional, IsString } from 'class-validator';

export class Pagination {
  @IsString()
  @IsOptional()
  order: 'ASC' | 'DESC' = 'DESC';

  @IsString()
  @IsOptional()
  limit: string = '10';
}
