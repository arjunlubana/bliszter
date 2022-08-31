import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import Router from 'next/router'

export let frontendConfig = () => {
  const appInfo = {
    appName: 'SuperTokens Demo App',
    websiteDomain: window.location.origin,
    apiDomain: window.location.origin,
    apiBasePath: '/api/auth/',
  }
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({}),
      SessionReact.init(),
    ],
    // this is so that the SDK uses the next router for navigation
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: any) => {
            Router.push(href)
          },
        },
      }
    },
  }
}
