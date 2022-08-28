import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <Grid h="100%" templateColumns="repeat(6, 1fr)" gap={4}>
      <GridItem colSpan={1} bg="gray.100" >
        <Sidebar />
      </GridItem>
      <GridItem colStart={2} colEnd={7} bg="papayawhip">
        {children}
      </GridItem>
    </Grid>
  );
}
