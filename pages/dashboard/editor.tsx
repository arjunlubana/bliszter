import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import ReactMde, { Suggestion } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Layout from "../../layouts";
import DashboardLayout from "../../layouts/dashboard";
import { poster } from "../../utils";
import type { NextPageWithLayout } from "../_app";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const loadSuggestions = async (text: string) => {
  return new Promise<Suggestion[]>((accept, reject) => {
    setTimeout(() => {
      const suggestions: Suggestion[] = [
        {
          preview: "Andre",
          value: "@andre",
        },
        {
          preview: "Angela",
          value: "@angela",
        },
        {
          preview: "David",
          value: "@david",
        },
        {
          preview: "Louise",
          value: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
const Editor: NextPageWithLayout = () => {
  const toast = useToast();
  const [markdown, setMarkdown] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );
  const [title, setTitle] = useState("");

  // const save: SaveImageHandler = async function*(data: ArrayBuffer) {
  //   // Promise that waits for "time" milliseconds
  //   const wait = function(time: number) {
  //     return new Promise((a, r) => {
  //       setTimeout(() => a(), time);
  //     });
  //   };

  //   // Upload "data" to your server
  //   // Use XMLHttpRequest.send to send a FormData object containing
  //   // "data"
  //   // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

  //   await wait(2000);
  //   // yields the URL that should be inserted in the markdown
  //   yield "https://picsum.photos/300";
  //   await wait(2000);

  //   // returns true meaning that the save was successful
  //   return true;
  // };

  const onPublish = async (e) => {
    e.preventDefault();
    let data = {
      title,
      markdown,
    };
    const devto = await poster("/api/devto/post-article", data);
    toast({
      ...devto,
      duration: 3000,
      isClosable: true,
    });
    const hashnode = await poster("/api/hashnode/post-article", data);
    toast({
      ...hashnode,
      duration: 3000,
      isClosable: true,
    });
    const medium = await poster("/api/medium/post-article", data);
    toast({
      ...medium,
      duration: 3000,
      isClosable: true,
    });
    await poster("/api/save-to-redis", {
      title: data.title,
      markdown: data.markdown,
      medium_url: medium.url,
      hashnode_url: hashnode.url,
      devto_url: devto.url,
    });
  };

  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <form>
        <Input
          variant="flushed"
          placeholder="Give your story a title..."
          size="lg"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <ReactMde
          value={markdown}
          onChange={setMarkdown}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          loadSuggestions={loadSuggestions}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          minEditorHeight={300}
          maxEditorHeight={600}
        />
        <Button colorScheme="orange" m={1} onClick={onPublish}>
          Publish
        </Button>
      </form>
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
};
Editor.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};
export default Editor;
