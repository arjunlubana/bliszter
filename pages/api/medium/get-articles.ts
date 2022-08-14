import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { MediumArticle } from "../../../lib/interfaces/medium";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MediumArticle[]>
) {
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${process.env.MEDIUM_API_TOKEN}`,
  };

  let reqOptions = {
    url: `https://api.medium.com/v1/users/${process.env.MEDIUM_USER_ID}/publications`,
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  res.status(200).json(response.data.data);
}
