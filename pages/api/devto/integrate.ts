import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";

export default async function integrate(req: any, res: any) {
  await superTokensNextWrapper(
    async (next) => {
      await verifySession()(req, res, next);
    },
    req,
    res
  );
  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const dev_to_token = req.body.dev_to_token

  await UserMetadata.updateUserMetadata(userId, {
    dev_to_token: dev_to_token
  });
  res.json({ message: "successfully integration with devto" });
}
