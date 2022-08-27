import supertokens from "supertokens-node";
import { SessionRequest } from "supertokens-node/framework/express";
import authorize from "../../../supertokens/authorize";
import { backendConfig } from "../../../supertokens/backendConfig";

supertokens.init(backendConfig());

export default async function user(req: SessionRequest, res: any) {
  await authorize(req, res);
  // if it comes here, it means that the session verification was successful
  return res.json({
    note: "Fetch any data from your application for authenticated user after using verifySession middleware",
    userId: req.session.getUserId(),
    sessionHandle: req.session.getHandle(),
    userDataInAccessToken: req.session.getAccessTokenPayload(),
  });
}
