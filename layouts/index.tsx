import { ChakraProvider, Divider, Grid, GridItem } from "@chakra-ui/react";
import Footer from "../components/footer";
import Header from "../components/header";
import theme from "./themes/theme";
import "@fontsource/poppins/400.css";

import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={"10vh 1fr 15vh"}
        gridTemplateColumns={"150px 1fr"}
        h="90vh"
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
          <Header />
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
