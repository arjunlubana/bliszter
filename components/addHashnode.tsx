import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FormEvent } from "react";
import { poster } from "../utils";

export default function AddHashnode() {
  const [username, setUsername] = useState("");
  const [hashnodeToken, setHashnodeToken] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast()

  const onIntegration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = {
      username,
      hashnodeToken,
    };
    const response = await poster("/api/hashnode/integrate", data);
    toast({
      ...response,
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <form onSubmit={onIntegration}>
      <Input
        pr="4.5rem"
        type={"text"}
        placeholder="Your Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Your Integration Token"
          onChange={(e) => {
            setHashnodeToken(e.target.value);
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
