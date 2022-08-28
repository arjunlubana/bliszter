import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";
import axios from "axios";

export default async function integrate(req: SessionRequest, res: any) {
  await authorize(req, res);
  await superTokensNextWrapper(
    async (next) => {
      await verifySession()(req, res, next);
    },
    req,
    res
  );
  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const medium_token = req.body.medium_token;

  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${medium_token}`,
  };

  let reqOptions = {
    url: "https://api.medium.com/v1/me",
    method: "GET",
    headers: headersList,
  };
  try {
    let response = await axios.request(reqOptions);
    await UserMetadata.updateUserMetadata(userId, {
      medium_user_id: response.data.data.id,
      medium_token: medium_token,
    });
    res.json({
      title: "Integrated with Medium",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      title: "Failed to Integrate with Hashnode",
      description: "We are unable to integrate with hashnode",
      status: "error",
    });
  }
}
