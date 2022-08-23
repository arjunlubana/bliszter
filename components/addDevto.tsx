import { FormEvent } from "react";
import { poster } from "../utils";

export default function AddDevto() {
  const onIntegration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData)
    await poster("/api/devto/integrate", formData);
  };
  return (
    <form onSubmit={onIntegration}>
      <label htmlFor="Dev To Integration Token">Integration Token</label>
      <input type="text" name="dev_to_token" />
      <input type="submit" value="Integrate" />
    </form>
  );
}
