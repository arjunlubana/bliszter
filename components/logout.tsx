import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { Button } from "@chakra-ui/react";

export default function Logout() {
  async function onLogout() {
    await signOut();
    window.location.href="/"
  }
  return (
    <Button onClick={onLogout}>
      Logout
    </Button>
  );
}
