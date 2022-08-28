import type { NextPage } from "next";
import React from "react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import AddDevto from "../components/addDevto";
import AddHashnode from "../components/addHashnode";
import AddMedium from "../components/addMedium";

import styles from "../styles/Home.module.css";

const Integrations: NextPage = () => {
  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <div className={styles.container}>
        Integrations
        <AddDevto />
        <AddHashnode />
        <AddMedium />
      </div>
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
};

export default Integrations;
