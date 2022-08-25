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
    title: req.body.markdown,
    contentFormat: "markdown",
    content:req.body.markdown,
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
