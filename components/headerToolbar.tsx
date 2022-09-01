import { Button, Avatar } from "@chakra-ui/react";
import NextLink from "next/link";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
export default function HeaderToolbar() {
  return (
    <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
        <NextLink href="/auth" passHref>
          <Button
            as="a"
            href="/auth/signin"
            colorScheme={"orange"}
          >
            SignIn
          </Button>
        </NextLink>
        <Avatar size="sm" />
    </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
  );
}
