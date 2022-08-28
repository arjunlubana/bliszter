import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

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

  try {
    await UserMetadata.updateUserMetadata(userId, {
      medium_token: medium_token,
    });
    res.json({
      title: "Integrated with Medium",
      status: "success",
    });
  } catch (error) {
    res.json({
      title: "Failed to Integrate with Hashnode",
      description: "We are unable to integrate with hashnode",
      status: "error",
    });
  }
}
