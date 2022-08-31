import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { TypeInput } from "supertokens-node/types";
import { appInfo } from "./appInfo";

const connectionURI = process.env.SUPERTOKENS_URL;
const apiKey = process.env.SUPERTOKENS_APIKEY;

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      // These are the connection details of the app you created on supertokens.com
      connectionURI: `${connectionURI}`,
      apiKey,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({}),
      SessionNode.init(),
      UserMetadata.init(),
    ],
    isInServerlessEnv: true,
  };
};
