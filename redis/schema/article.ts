import { Entity, Schema } from "redis-om";
import redis from "../redis";

/* our entity */
class Article extends Entity {}
interface Article {
  userId: string;
  title: string;
  markdown: string;
  medium_url: string;
  hashnode_url: string;
  devto_url: string;
}
/* create a Schema for Person */
const articleSchema = new Schema(Article, {
  userId: { type: "string" },
  title: { type: "string" },
  markdown: { type: "string" },
  medium_url: { type: "string" },
  hashnode_url: { type: "string" },
  devto_url: { type: "string" },
});

/* use the redis client to create a Repository just for Articles */
const articleRepository = redis.fetchRepository(articleSchema);

/* create the index for Person */
(async () => {
  await articleRepository.createIndex();
})();

async function createArticle(article) {
  const id = await articleRepository.createAndSave(article);
  return id;
}

export { createArticle };
