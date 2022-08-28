import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { poster } from "../utils";

export default function AddDevto() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onIntegration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    await poster("/api/devto/integrate", formData);
  };
  return (
    <form onSubmit={onIntegration}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Your Integration Token"
        />
        <InputRightElement width="3rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button type="submit" colorScheme="orange" variant="outline" m="0.5em">
        Integrate
      </Button>
    </form>
  );
}
