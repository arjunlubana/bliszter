import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import {appInfo} from "./appInfo"

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Facebook.init(),
            ThirdPartyEmailPasswordReact.Github.init(),
            ThirdPartyEmailPasswordReact.Apple.init(),
          ],
        },
      }),
      SessionReact.init(),
    ],
  };
};
