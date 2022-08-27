import axios from "axios";
import type { NextApiResponse } from "next";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { MediumPublishedArticle } from "../../../interfaces/medium";
import authorize from "../../../supertokens/authorize";

export default async function handler(
  req: SessionRequest,
  res: NextApiResponse<MediumPublishedArticle>
) {
  await authorize(req, res);

  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const { metadata } = await UserMetadata.getUserMetadata(userId);

  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${metadata.medium_token}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    title: req.body.markdown,
    contentFormat: "markdown",
    content: req.body.markdown,
    tags: ["redis", "hackathon"],
  });

  let reqOptions = {
    url: `https://api.medium.com/v1/users/${process.env.MEDIUM_USER_ID}/posts`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  let response = await axios.request(reqOptions);
  res.status(200).json(response.data.data);
}
