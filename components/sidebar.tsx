import { EditIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";
import { Flex, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import Logout from "./logout";

export default function Sidebar() {
  const align = useBreakpointValue(
    {
      base: "center",
      md: "left",
    },
    {
      // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
      fallback: "center",
    }
  );
  const expand = useBreakpointValue({
    base: false,
    md: true,
  });
  return (
    <Flex h="100%" direction="column" py="1em" align={align} mr={"10px"}>
      <NextLink href="/dashboard" passHref>
        <Link display={"flex"} alignItems="center">
          <StarIcon boxSize="1.5em" m="1em" />
          {expand ? <Text fontSize="lg">Dashboard</Text> : ""}
        </Link>
      </NextLink>
      <NextLink href="/dashboard/editor" passHref>
        <Link display={"flex"} alignItems="center">
          <EditIcon boxSize="1.5em" m="1em" />
          {expand ? <Text fontSize="lg">Editor</Text> : ""}
        </Link>
      </NextLink>
      <NextLink href="/dashboard/integrations" passHref>
        <Link display={"flex"} alignItems="center">
          <SettingsIcon boxSize="1.5em" m="1em" />
          {expand ? <Text fontSize="lg">Integrations</Text> : ""}
        </Link>
      </NextLink>
      <Logout />
    </Flex>
  );
}
