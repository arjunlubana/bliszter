import Link from "next/link";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function Logout() {
  async function onLogout() {
    await signOut();
    window.location.href="/"
  }
  return (
    <button onClick={onLogout}>
      Logout
    </button>
  );
}
