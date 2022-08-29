import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { TypeInput } from "supertokens-node/types";

const apiDomain = process.env.VERCEL_URL !== undefined ? process.env.VERCEL_URL : `http://localhost:3001`;
const websiteDomain = process.env.VERCEL_URL !== undefined ? process.env.VERCEL_URL : `http://localhost:3000`;

export const backendConfig = (): TypeInput => {
  const connectionURI = process.env.SUPERTOKENS_CONN_URI;
  const apiKey = process.env.SUPERTOKENS_API_KEY;
  return {
    framework: "express",
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: `${connectionURI}`,
      apiKey,
    },
    appInfo: {
      appName: "SuperTokens Demo App", // TODO: Your app name
      apiDomain,
      websiteDomain,
      apiBasePath: "/api/auth",
      websiteBasePath: "/auth",
  },
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          // Third Party Authentication providers
          ThirdPartyEmailPasswordNode.Google({
            clientId: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_AUTH_CLIENT_SECRET}`,
          }),
          ThirdPartyEmailPasswordNode.Github({
            clientId: `${process.env.GITHUB_AUTH_CLIENT_ID}`,
            clientSecret: `${process.env.GITHUB_AUTH_CLIENT_SECRET}`,
          }),
          ThirdPartyEmailPasswordNode.Apple({
            clientId: `${process.env.APPLE_AUTH_CLIENT_ID}`,
            clientSecret: {
              keyId: `${process.env.APPLE_AUTH_KEY_ID}`,
              privateKey: `${process.env.APPLE_AUTH_PRIVATE_KEY}`,
              teamId: `${process.env.APPLE_AUTH_TEAM_ID}`,
            },
          }),
        ],
      }),
      SessionNode.init(),
      UserMetadata.init(),
    ],
    isInServerlessEnv: true,
  };
};
