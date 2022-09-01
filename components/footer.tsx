import { Box, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"}>
      <Text mt={"0.5em"}>Made with 🧡️ Arjun Lubana</Text>
      <Flex direction={"column"} justify={"center"} align={"center"} >
        <Tag size="lg" colorScheme="red" borderRadius="full" m="2">
          <TagLabel >Powered by Redis</TagLabel>
        </Tag>
        <Tag size="sm" colorScheme="green" borderRadius="full" mb="2">
          <TagLabel display={"flex"} justifyContent={"center"}>
            Deployed by
            <span>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </TagLabel>
        </Tag>
      </Flex>
    </Flex>
  );
}
