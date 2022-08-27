import supertokens from "supertokens-node";
import { backendConfig } from "../../../supertokens/backendConfig";
import NextCors from "nextjs-cors";
import { SessionRequest } from "supertokens-node/framework/express";
import authorize from "../../../supertokens/authorize";

supertokens.init(backendConfig());

export default async function user(req: SessionRequest, res: any) {
  // NOTE: We need CORS only if we are querying the APIs from a different origin
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  });
  await authorize(req, res);
  // if it comes here, it means that the session verification was successful

  return res.json({
    note: "Fetch any data from your application for authenticated user after using verifySession middleware",
    userId: req.session.getUserId(),
    sessionHandle: req.session.getHandle(),
    userDataInAccessToken: req.session.getAccessTokenPayload(),
  });
}
