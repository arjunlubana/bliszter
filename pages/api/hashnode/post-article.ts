import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { SessionRequest } from "supertokens-node/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import authorize from "../../../supertokens/authorize";

export default async function handler(req: SessionRequest, res: any) {
  await authorize(req, res);

  const session = (req as SessionRequest).session;
  const userId = session!.getUserId();
  const { metadata } = await UserMetadata.getUserMetadata(userId);

  const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `${metadata.hashnode_token}`,
    },
  });
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation CREATE_POST($title: String!, $body: String!, $publicationId: String!) {
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
            publicationId: $publicationId
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
        title: req.body.title,
        body: req.body.markdown,
        publicationId: metadata.hashnode_publication
      },
    });
    res.status(200).json({
      ...response.data,
      title: "Published to Hashnode",
      status: "success",
    });
  } catch (error) {
    res.status(200).json({
      title: "Failed to publish article",
      description: "We are unable to publish your article to Hashnode",
      status: "error",
    });
  }
}
