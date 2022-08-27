import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function integrate(req: SessionRequest, res: any) {
  await authorize(req, res);
  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const dev_to_token = req.body.dev_to_token

  await UserMetadata.updateUserMetadata(userId, {
    dev_to_token: dev_to_token
  });
  res.json({ message: "successfully integration with devto" });
}
