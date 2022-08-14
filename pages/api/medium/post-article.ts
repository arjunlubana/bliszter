import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { MediumPublishedArticle } from "../../../interfaces/medium";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MediumPublishedArticle>
) {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.MEDIUM_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    title: "Liverpool FC",
    contentFormat: "html",
    content: "<h1>Liverpool FC</h1><p>You’ll never walk alone.</p>",
    canonicalUrl: "http://jamietalbot.com/posts/liverpool-fc",
    tags: ["football", "sport", "Liverpool"],
    publishStatus: "public",
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
