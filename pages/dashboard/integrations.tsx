import { Box, Heading } from "@chakra-ui/react";
import { ReactElement } from "react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import AddDevto from "../../components/addDevto";
import AddHashnode from "../../components/addHashnode";
import AddMedium from "../../components/addMedium";
import Layout from "../../layouts";
import DashboardLayout from "../../layouts/dashboard";
import type { NextPageWithLayout } from "../_app";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
const Integrations: NextPageWithLayout = () => {
  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <Heading size="md" textAlign="center">Integrations</Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Dev Community
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <AddDevto />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Hashnode
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <AddHashnode />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Medium
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <AddMedium />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
