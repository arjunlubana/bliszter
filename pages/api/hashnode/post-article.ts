import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `${process.env.HASHNODE_ACCESS_TOKEN}`,
    },
  });

  client
    .mutate({
      mutation: gql`
        mutation {
          createPublicationStory(
            input: {
              title: "Introducing bliszter"
              contentMarkdown: "Bliszter will help you manage blogs from diffrrent platform"
              slug: "bliszter project"
              tags: [
                { _id: 3245454365546546, slug: "bliszter", name: "bliszter" }
              ]
            }
            publicationId: "605590e663a05a21443f18ba"
            hideFromHashnodeFeed: true
          ) {
            code
            success
            message
            post {
              title
              slug
            }
          }
        }
      `,
    })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
}
