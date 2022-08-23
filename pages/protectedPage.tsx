import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";

import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

const ProtectedPage: NextPage = () => {
  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <div className={styles.container}>You are authenticated</div>
      <Link href="/">
      <a>Back Home</a>
    </Link>
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
};

export default ProtectedPage;
