import axios from "axios";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function handler(req: SessionRequest, res: any) {
  await authorize(req, res);

  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const { metadata } = await UserMetadata.getUserMetadata(userId);

  let headersList = {
    "Content-Type": "application/json",
    "api-key": `${metadata.dev_to_token}`,
  };

  let bodyContent = JSON.stringify({
    article: {
      title: req.body.title,
      published: true,
      body_markdown: req.body.markdown,
      tags: ["redis", "hackathon"],
    },
  });

  let reqOptions = {
    url: `https://dev.to/api/articles`,
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
        title: "Published to Dev Community",
        status: "success",
      });
  } catch (error) {
    res.status(200).json({
      title: "Failed to publish article",
      description: "We are unable to publish your article to Dev Community",
      status: "error",
    });
  }
}
