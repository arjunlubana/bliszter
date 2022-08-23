import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { createUser } from "../redis/createUser";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";

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
    appInfo,
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
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              // override the email password sign up API
              emailPasswordSignUpPOST: async function (input) {
                if (
                  originalImplementation.emailPasswordSignUpPOST === undefined
                ) {
                  throw Error("Should never come here");
                }

                let response =
                  await originalImplementation.emailPasswordSignUpPOST(input);

                if (response.status === "OK") {
                  // TODO: some post sign up logic
                  await createUser(response.user.id);
                }

                return response;
              },

              // override the thirdparty sign in / up API
              thirdPartySignInUpPOST: async function (input) {
                if (
                  originalImplementation.thirdPartySignInUpPOST === undefined
                ) {
                  throw Error("Should never come here");
                }

                let response =
                  await originalImplementation.thirdPartySignInUpPOST(input);

                if (response.status === "OK" && response.createdNewUser) {
                  await createUser(response.user.id);
                }

                return response;
              },
            };
          },
        },
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};
