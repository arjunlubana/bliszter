import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function Header({ children }) {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" m={"2"}>
      <Box p="2">
        <Heading size="lg">Bliszter</Heading>
      </Box>
      <Spacer />
      {children}
    </Flex>
  );
}
