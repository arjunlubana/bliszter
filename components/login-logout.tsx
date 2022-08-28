import { Avatar, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function LoginLogout() {
  let session = useSessionContext();

  if (session.loading) {
    return null;
  }

  let { doesSessionExist, userId, accessTokenPayload } = session;
  return (
    <>
      {doesSessionExist ? (
        <Avatar name={"Arjun Lubana"} bg="orange.500" />
      ) : (
        <ButtonGroup gap="2">
          <Button colorScheme="orange" variant="outline">
            Sign Up
          </Button>
          <Button colorScheme="orange">Log in</Button>
        </ButtonGroup>
      )}
    </>
  );
}
