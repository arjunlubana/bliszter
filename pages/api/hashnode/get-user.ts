import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
        query {
          user(username: "JunoX") {
            _id
            username
            name
          }
        }
      `,
    })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
}
