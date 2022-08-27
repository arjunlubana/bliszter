import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionRequest } from "supertokens-node/framework/express";
import { MediumUser } from "../../../interfaces/medium";
import authorize from "../../../supertokens/authorize";

export default async function handler(
  req: SessionRequest,
  res: NextApiResponse<MediumUser>
) {
  await authorize(req, res);
  let headersList = {
    Accept: "*/*",
    Authorization:
      `Bearer ${process.env.MEDIUM_API_TOKEN}`,
  };

  let reqOptions = {
    url: "https://api.medium.com/v1/me",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  res.status(200).json(response.data.data);
}
