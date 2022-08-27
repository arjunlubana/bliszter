import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { SessionRequest } from "supertokens-node/framework/express";
import authorize from "../../../supertokens/authorize";

export default async function handler(
  req: SessionRequest,
  res: any
) {
  await authorize(req, res);
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
