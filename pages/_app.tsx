import type { NextPage } from "next";
import { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import * as SuperTokensConfig from '../supertokens/frontendConfig'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(SuperTokensConfig.frontendConfig());
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  React.useEffect(() => {
    async function doRefresh() {
      // pageProps.fromSupertokens === 'needs-refresh' will be true
      // when in getServerSideProps, getSession throws a TRY_REFRESH_TOKEN
      // error.

      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          // post session refreshing, we reload the page. This will
          // send the new access token to the server, and then
          // getServerSideProps will succeed
          location.reload();
        } else {
          // the user's session has expired. So we redirect
          // them to the login page
          redirectToAuth();
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);

  if (pageProps.fromSupertokens === "needs-refresh") {
    // in case the frontend needs to refresh, we show nothing.
    // Alternatively, you can show a spinner.

    return null;
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <SuperTokensWrapper>
        <Component {...pageProps} />
    </SuperTokensWrapper>
  );
}
export default MyApp;
