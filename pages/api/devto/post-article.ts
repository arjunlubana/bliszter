import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let headersList = {
    "Content-Type": "application/json",
    "api-key": `${process.env.DEV_TO_API_TOKEN}`,
  };

  let bodyContent = JSON.stringify({
    article: {
      title: "Bliszter",
      published: true,
      body_markdown: "A new way to post your articles to multiple platforms",
      tags: ["redis", "hackathon"],
      series: "Hackathon",
    },
  });

  let reqOptions = {
    url: `https://dev.to/api/articles`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  let response = await axios.request(reqOptions);
  res.status(200).json(response.data);
}
