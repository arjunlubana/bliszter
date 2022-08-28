import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Header from "../components/header";

export default function Layout({ children }) {
  return (
    <ChakraProvider>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="gray.100" area={"header"}>
          <Header />
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          Nav
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          {children}
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
