import { Divider, Grid, GridItem, Stack } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <Grid h="100%" templateColumns="repeat(6, 1fr)" gap={4}>
      <GridItem colSpan={1} h={"100%"} position={"fixed"}>
        <Stack direction="row" h="80vh" p={4}>
          <Sidebar />
          <Divider orientation="vertical" />
        </Stack>
      </GridItem>
      <GridItem
        colStart={2}
        colEnd={7}
        m="2em"
        maxWidth={{ base: "100%", md: "80%" }}
      >
        {children}
      </GridItem>
    </Grid>
  );
}
