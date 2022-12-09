import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";

import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";

const CreatePage: NextPage = () => {
  const [value, setValue] = useState<string>("18");
  const [mintToAddress, setMintToAddress] = useState<string>("");

  return (
    <Layout>
      <Unit header={"zkSBT Issuer App"}>
        <Stack spacing="6">
          <Stack>
            <FormControl>
              <FormLabel>Credential Type</FormLabel>
              <Input value="Age Verification" fontSize={"sm"} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Value Type</FormLabel>
              <Input value={"Number"} fontSize={"sm"} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Operator</FormLabel>
              <Input value={"Greater than Equal"} fontSize={"sm"} disabled />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"sm"}>Value</FormLabel>
              <NumberInput min={0} max={100} value={value} onChange={setValue}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"sm"}>Mint To</FormLabel>
              <Input value={mintToAddress} fontSize={"sm"} />
            </FormControl>
          </Stack>
          <Button
            onClick={() => {
              const parsedValue = Number(value);
              console.log(parsedValue);
            }}
          >
            Create
          </Button>
        </Stack>
      </Unit>
    </Layout>
  );
};

export default CreatePage;
