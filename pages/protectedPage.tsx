import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React from "react";

import Session from "supertokens-node/recipe/session";
import supertokensNode from "supertokens-node";
import { backendConfig } from "../config/backendConfig";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export async function getServerSideProps(context: any) {
  // this runs on the backend, so we must call init on supertokens-node SDK
  supertokensNode.init(backendConfig());

  // this will contain the session object post verification
  let session;

  try {
    // getSession will do session verification for us
    session = await Session.getSession(context.req, context.res);
  } catch (err: any) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      // in this case, the session is still valid, only the access token has expired.
      // The refresh token is not sent to this route as it's tied to the /api/auth/session/refresh API paths.
      // So we must send a "signal" to the frontend which will then call the
      // refresh API and reload the page.

      return { props: { fromSupertokens: "needs-refresh" } };
      // or return {fromSupertokens: 'needs-refresh'} in case of getInitialProps
    } else if (err.type === Session.Error.UNAUTHORISED) {
      // user is logged out. Since this is for a protected route,
      // we can simple send an empty prop object. Alternatively,
      // you can pass anything else you would like here.
      return { props: {} };
      // or return {} in case of getInitialProps
    } else {
      throw err;
    }
  }

  // session verification is successful and we can pass
  // the user's ID to the frontend.

  return {
    props: { userId: session!.getUserId() },
  };
  // or return {userId: session.getUserId()} in case of getInitialProps
}

const ProtectedPage: NextPage = (props: any) => {
  let userId = props.userId;
  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <div className={styles.container}>Your user id is {userId}</div>
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
};

export default ProtectedPage;
