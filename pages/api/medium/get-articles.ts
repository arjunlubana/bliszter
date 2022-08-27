import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionRequest } from "supertokens-node/framework/express";
import { MediumArticle } from "../../../interfaces/medium";
import authorize from "../../../supertokens/authorize";

export default async function handler(
  req: SessionRequest,
  res: NextApiResponse<MediumArticle[]>
) {
  await authorize(req, res);
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
