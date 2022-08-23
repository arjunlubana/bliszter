import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { deleteUser } from "supertokens-node";
import { SessionRequest } from "supertokens-node/framework/express";
import Session from "supertokens-node/recipe/session";

type Data = { name: string };
export default async function delete_user(req: SessionRequest, res: any) {
  // we first verify the session
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req, res, next);
    },
    req,
    res
  );
  // if it comes here, it means that the session verification was successful
  // if session is valid we revoke all sessions then delete user
  let userId = req.session!.getUserId();
  
  await Session.revokeAllSessionsForUser(userId);
  await deleteUser(userId);
  res.status(200).send("Success! User session revoked");
}
