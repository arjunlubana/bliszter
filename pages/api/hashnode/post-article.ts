import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

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
        mutation CREATE_POST($title: String!, $body: String!){
          createPublicationStory(
            input: {
              title: $title
              contentMarkdown: $body
              slug: "bliszter project"
              tags: [
                { 
                  _id: 3245454365546546, 
                  slug: "bliszter", 
                  name: "bliszter" 
                }
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
      variables: {
        "title": req.body.title,
        "body": req.body.markdown
      },
    })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
}
