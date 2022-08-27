import type { NextApiRequest, NextApiResponse } from "next";
import { createArticle } from "../../redis/schema/article";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const result = await createArticle({
    userId: "fkdjfjd",
    title: req.body.title,
    markdown: req.body.markdown,
    medium_url: req.body.medium_url,
    hashnode_url: req.body.hashnode_url,
    devto_url: req.body.devto_url,
  });
  console.log(result);
  res.status(200).json(result);
}
