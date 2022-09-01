import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import "@fontsource/qwitcher-grypen/700.css";
import Head from "next/head";
import NextLink from "next/link"
import { ReactElement } from "react";
import Layout from "../layouts";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Bliszter</title>
        <meta name="description" content="Write once Publish anywhere" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex
          textAlign={"center"}
          h="70vh"
          direction={"column"}
          justifyContent={"center"}
          alignItems="center"
        >
          <Heading as="h1" size="4xl">
            Bliszter
          </Heading>
          <Text fontFamily={"Qwitcher Grypen"} fontSize="3xl">
            Write Once Publish Anywhere
          </Text>
          <NextLink href="/auth" passHref>
            <Button as="a" href="/Dashboard" colorScheme={"orange"} variant="outline">
              Dashboard
            </Button>
          </NextLink>
        </Flex>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Home;
