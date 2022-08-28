import axios from "axios";
import type { NextApiResponse } from "next";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function handler(
  req: SessionRequest,
  res: NextApiResponse
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
    title: req.body.title,
    contentFormat: "markdown",
    content: req.body.markdown,
    tags: ["redis", "hackathon"],
  });

  let reqOptions = {
    url: `https://api.medium.com/v1/users/${metadata.medium_user_id}/posts`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  try {
    let response = await axios.request(reqOptions);
    res
      .status(200)
      .json({
        ...response.data,
        title: "Published to Medium",
        status: "success",
      });
  } catch (error) {
    res.status(200).json({
      title: "Failed to publish article",
      description: "We are unable to publish your article to Hashnode",
      status: "error",
    });
  }
}
