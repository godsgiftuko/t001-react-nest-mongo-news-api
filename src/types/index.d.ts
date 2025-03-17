export interface INews {
  title: string;
  content: string;
  image_url: string;
  created_at: Date;
  views: number;
  likes: number;
  dislikes: number;
  author_id: string;
  tags: INewsTag[];
}

export interface INewsTag {
  name: string;
}
