import { SessionRequest } from "supertokens-node/framework/express";
import { createArticle } from "../../redis/schema/article";
import authorize from "../../supertokens/authorize";

export default async function handler(req: SessionRequest, res: any) {
  await authorize(req, res);
  const result = await createArticle({
    userId: "fkdjfjd",
    title: req.body.title,
    markdown: req.body.markdown,
    medium_url: req.body.medium_url,
    hashnode_url: req.body.hashnode_url,
    devto_url: req.body.devto_url,
  });
  res.status(200).json(result);
}
