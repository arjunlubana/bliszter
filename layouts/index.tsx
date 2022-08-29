import { ChakraProvider, Divider, Grid, GridItem } from "@chakra-ui/react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Footer from "../components/footer";
import Header from "../components/header";
import LoginLogout from "../components/login-logout";

import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <ChakraProvider>
      <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={"10vh 1fr 15vh"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem
          pl="2"
          bg="gray.100"
          area={"header"}
          position={"fixed"}
          w={"100%"}
          zIndex="100"
        >
          <Header>
            <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
              <LoginLogout />
            </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
          </Header>
        </GridItem>
        <GridItem area={"main"}>{props.children}</GridItem>
        <GridItem area={"footer"} p={"1em"}>
          <Divider />
          <Footer />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
