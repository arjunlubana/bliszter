import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function integrate(req: SessionRequest, res: any) {
  await authorize(req, res);
  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const dev_to_token = req.body.dev_to_token;
  try {
    await UserMetadata.updateUserMetadata(userId, {
      dev_to_token: dev_to_token,
    });
    res.json({
      title: "Integrated with Dev Community",
      status: "success",
    });
  } catch (error) {
    res.json({
      title: "Failed to Integrate with Dev Community",
      description: "We are unable to integrate with Dev Community",
      status: "error",
    });
  }
}
