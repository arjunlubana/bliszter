import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";

export function getApiDomain() {
  if (window.location.hostname === "localhost") {
    return "http://localhost:3000";
  }
  return window.location.origin;
}

export function getWebsiteDomain() {
  return window.location.origin;
}

export const frontendConfig = () => {
  return {
    appInfo: {
      appName: "Bliszter", // TODO: Your app name
      apiDomain: getApiDomain(), // TODO: Change to your app's API domain
      websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
      apiBasePath: "/api/auth/",
      websiteBasePath: "/auth",
    },
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
