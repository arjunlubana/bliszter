import { ChakraProvider, Divider, Grid, GridItem } from "@chakra-ui/react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Footer from "../components/footer";
import Header from "../components/header";
import LoginLogout from "../components/login-logout";

export default function Layout({ children }) {
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
        <GridItem area={"main"}>{children}</GridItem>
        <GridItem area={"footer"} p={"1em"}>
          <Divider />
          <Footer />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
