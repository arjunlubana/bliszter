import { Box, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"}>
      <Text mt={"0.5em"}>Made with 🧡️ Arjun Lubana</Text>
      <Box m={"5px"}>
        <Tag size="md" colorScheme="red" borderRadius="full">
          <TagLabel>Powered by Redis</TagLabel>
        </Tag>
        <Tag size="md" colorScheme="black" borderRadius="full">
          <TagLabel>Deployed by Vercel</TagLabel>
        </Tag>
      </Box>
    </Flex>
  );
}
