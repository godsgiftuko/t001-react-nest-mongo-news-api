import { config } from 'dotenv';

config();

export class Configs {
  static SERVER_PORT = process.env.SERVER_PORT || 3000;
  static DATABASE_NAME = 'news_app';
  static MONGO_URL =
    process.env.MONGO_URL || `mongodb://localhost/${Configs.DATABASE_NAME}`;
}