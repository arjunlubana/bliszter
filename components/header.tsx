import { Avatar, Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import useSWR from "swr";
import { fetcher } from "../utils";

export default function Header() {
  const { data, error } = useSWR("/api/user", fetcher);

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" m={"2"}>
      <Box p="2">
        <Heading size="lg">Bliszter</Heading>
      </Box>
      <Spacer />
      {error ? (
        <NextLink href="/auth" passHref>
          <Button as="a" href="/auth/signin" colorScheme={"orange"}>
            Sign In
          </Button>
        </NextLink>
      ) : (
        <Avatar size="sm" />
      )}
    </Flex>
  );
}
