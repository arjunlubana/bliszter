import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { MediumUser } from "../../../interfaces/medium";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MediumUser>
) {
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
