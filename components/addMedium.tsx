import { FormEvent } from "react";
import { poster } from "../utils";

export default function AddMedium() {
  const onIntegration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData)
    await poster("/api/medium/integrate", formData);
  };
  return (
    <form onSubmit={onIntegration}>
      <label htmlFor="Dev To Integration Token">Integration Token</label>
      <input type="text" name="medium_token" />
      <input type="submit" value="Integrate" />
    </form>
  );
}
