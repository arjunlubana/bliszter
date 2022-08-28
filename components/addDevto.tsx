import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { poster } from "../utils";

export default function AddDevto() {
  const [show, setShow] = React.useState(false);
  const [devToToken, setDevToToken] = useState("");

  const handleClick = () => setShow(!show);
  const toast = useToast();

  const onIntegration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = {
      dev_to_token: devToToken
    }

    const response = await poster("/api/devto/integrate", data);
    toast({
      ...response,
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <form onSubmit={onIntegration}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Your Integration Token"
          onChange={(e) => {
            setDevToToken(e.target.value);
          }}
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
