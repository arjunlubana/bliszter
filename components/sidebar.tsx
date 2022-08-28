import { EditIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Flex, IconButton, Spacer } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Flex h="100%" direction="column" py="1em" align="center">
      <IconButton
        aria-label="Write an article"
        icon={<EditIcon />}
        size="lg"
        fontSize="24px"
      />
      <IconButton
        aria-label="Settings"
        icon={<SettingsIcon />}
        size="lg"
        fontSize="24px"
      />
      <Spacer />
      <Avatar
        size="sm"
        name="Kent Dodds"
        src="https://bit.ly/kent-c-dodds"
      />
    </Flex>
  );
}
