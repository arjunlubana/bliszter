import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function integrate(req: SessionRequest, res: any) {
  await authorize(req, res);
  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const hashnode_token = req.body.hashnode_token;

  await UserMetadata.updateUserMetadata(userId, {
    hashnode_token: hashnode_token
  });
  res.json({ message: "successfully integration with hashnode" });
}
