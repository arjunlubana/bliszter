import { Grid, GridItem } from "@chakra-ui/react";

export default function EditorLayout({ children }) {
  return (
    <Grid h="100%" templateColumns="repeat(6, 1fr)" gap={4}>
      <GridItem colSpan={1} bg="tomato" />
      <GridItem colStart={2} colEnd={7} bg="papayawhip">
        {children}
      </GridItem>
    </Grid>
  );
}
