import { fetcher } from "../utils";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
async function onAccountDeletion() {
  await signOut();
  fetcher("/api/user/delete");
  window.location.href = "/";
  return;
}
export default function DeleteUser() {
  return <button onClick={onAccountDeletion}>Delete User</button>;
}
