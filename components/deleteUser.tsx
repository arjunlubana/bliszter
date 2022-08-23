import { fetcher } from "../utils";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function DeleteUser() {
  const onAccountDeletion = async () => {
    await fetcher("/api/user/delete");
    await signOut();
    window.location.href = "/";
  };
  return <button onClick={onAccountDeletion}>Delete User</button>;
}
