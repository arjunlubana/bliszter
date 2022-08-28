import Link from "next/link";
import React, { ReactElement } from "react";
import ReactMde, { Suggestion } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Layout from "../../layouts";
import DashboardLayout from "../../layouts/dashboard";
import { poster } from "../../utils";
import type { NextPageWithLayout } from "../_app";

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
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

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
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    formData.markdown = value;
    const devto = await poster("/api/devto/post-article", formData);
    const hashnode = await poster("/api/hashnode/post-article", formData);
    const medium = await poster("/api/medium/post-article", formData);
    await poster("/api/save-to-redis", {
      title: formData.title,
      markdown: formData.markdown,
      medium_url: medium.url,
      hashnode_url: hashnode.url,
      devto_url: devto.url,
    });
  };
  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
      <form onSubmit={onPublish}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <input type="submit" value="Publish" />
      </form>
      <ReactMde
        value={value}
        onChange={setValue}
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
      />
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
