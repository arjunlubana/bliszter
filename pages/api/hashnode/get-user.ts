import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";
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
  });

  client
    .query({
      query: gql`
        query {
          user(username: "JunoX") {
            _id
            username
            name
            publication {
              _id
              title
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
