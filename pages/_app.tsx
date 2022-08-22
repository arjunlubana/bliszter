import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'

import { frontendConfig } from "../supertokens/frontendConfig";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }: AppProps) {
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
  return (
    <SuperTokensWrapper>
      <Component {...pageProps} />
    </SuperTokensWrapper>
  );
}

export default MyApp;
