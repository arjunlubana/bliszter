import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode
}

export default function Header(props: HeaderProps) {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" m={"2"}>
      <Box p="2">
        <Heading size="lg">Bliszter</Heading>
      </Box>
      <Spacer />
      {props.children}
    </Flex>
  );
}
