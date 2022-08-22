import { Entity, Schema } from "redis-om";
import redis from "../redis";

/* our entity */
class User extends Entity {}
interface User {
  userId: string;
  hashnode_token: string;
  medium_token: string;
  dev_to_token: string;
}
/* create a Schema for Person */
const userSchema = new Schema(User, {
  userId: { type: "string" },
  hashnode_token: { type: "string" },
  medium_token: { type: "string" },
  dev_to_token: { type: "string" },
});

/* use the redis client to create a Repository just for Users */
export const userRepository = redis.fetchRepository(userSchema);

/* create the index for Person */
(async () => {
  await userRepository.createIndex();
})();
