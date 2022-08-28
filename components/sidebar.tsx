import { EditIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { Avatar, Flex, IconButton, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Sidebar() {
  return (
    <Flex h="100%" direction="column" py="1em" align="center">
      <NextLink href="/dashboard" passHref>
        <Link>
          <StarIcon boxSize="1.5em" m="1em" />
        </Link>
      </NextLink>
      <NextLink href="/dashboard/editor" passHref>
        <Link>
          <EditIcon boxSize="1.5em" m="1em" />
        </Link>
      </NextLink>
      <NextLink href="/dashboard/integrations" passHref>
        <Link>
          <SettingsIcon boxSize="1.5em" m="1em" />
        </Link>
      </NextLink>
      <Spacer />
      <Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
    </Flex>
  );
}
