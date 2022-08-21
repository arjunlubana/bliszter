import { Client } from "redis-om";

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

/* create and open the Redis OM Client */
const redis = new Client();

async function redisConnect() {
  await redis.open(url);
}
// Connect to redis client
if (!redis.isOpen()) {
  redisConnect()
}

export default redis;
