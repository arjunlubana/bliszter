import { Entity, Schema } from "redis-om";
import redis from "../redis";

/* our entity */
class Article extends Entity {}
interface Article {
  userId: string;
  medium_url: string;
  hashnode_url: string;
  devto_url: string;
}
/* create a Schema for Person */
const articleSchema = new Schema(Article, {
  make: { type: "string" },
  model: { type: "string" },
  image: { type: "string" },
  description: { type: "string" },
});

/* use the redis client to create a Repository just for Articles */
export const articleRepository = redis.fetchRepository(articleSchema);

/* create the index for Person */
(async () => {
  await articleRepository.createIndex();
})();
