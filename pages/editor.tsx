import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import ReactMde, { Suggestion, SaveImageHandler } from "react-mde";
import * as Showdown from "showdown";
import { poster } from "../utils";
import "react-mde/lib/styles/css/react-mde-all.css";

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
const Editor: NextPage = () => {
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

  const onPublish = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    formData.markdown = value
    poster("/api/devto/post-article", formData);
    poster("/api/hashnode/post-article", formData);
    poster("/api/medium/post-article", formData);
  };

  return (
    <>
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
      <Link href="/">
        <a>Back Home</a>
      </Link>
    </>
  );
};

export default Editor;
