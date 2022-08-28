import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function integrate(req: SessionRequest, res: any) {
  await authorize(req, res);
  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const hashnode_token = req.body.hashnodeToken;
  const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
  });
  try {
    const response = await client.query({
      query: gql`
        query GET_PUBLICATION_ID($username: String!) {
          user(username: $username) {
            publication {
              _id
            }
          }
        }
      `,
      variables: {
        username: req.body.username,
      },
    });

    await UserMetadata.updateUserMetadata(userId, {
      hashnode_token: hashnode_token,
      hashnode_publication: response.data.user.publication._id,
    });

    res.json({
      title: "Integrated with Hashnode",
      status: "success",
    });
  } catch (error) {
    res.json({
      title: "Failed to Integrate with Hashnode",
      description: "We are unable to integrate with hashnode",
      status: "error",
    });
  }
}
