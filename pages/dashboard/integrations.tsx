import { ReactElement } from "react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import AddDevto from "../../components/addDevto";
import AddHashnode from "../../components/addHashnode";
import AddMedium from "../../components/addMedium";
import Layout from "../../layouts";
import DashboardLayout from "../../layouts/dashboard";
import type { NextPageWithLayout } from "../_app";

import styles from "../styles/Home.module.css";

const Integrations: NextPageWithLayout = () => {
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

Integrations.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export default Integrations;
