import { Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";
import { useConnected } from "@/hooks/useConnected";
import { useErrorHandler } from "@/hooks/useErrorHandler";

const CreatePage: NextPage = () => {
  const { connected } = useConnected();

  const [value, setValue] = useState<string>("18");
  const [mintToAddress, setMintToAddress] = useState("");
  const [alreadyMinted, setAlreadyMinted] = useState(false);

  const { handle } = useErrorHandler();

  useEffect(() => {
    if (!connected) {
      setMintToAddress("");
      return;
    }
    setMintToAddress(connected.signerAddress);
    connected.privateSoulMinter.souls(connected.signerAddress).then((tokenId) => {
      setAlreadyMinted(tokenId.gt(0));
    });
  }, [connected]);

  return (
    <Layout>
      <Unit header={"zkSBT Issuer App"}>
        <Stack>
          <Text fontSize="x-small" color="accent">
            * Test data is set for easy demo
          </Text>
          <Stack spacing="6">
            <Stack>
              <FormControl>
                <FormLabel>Credential Type</FormLabel>
                <Input value="Age Verification" disabled fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel>Value Type</FormLabel>
                <Input value={"Number"} disabled fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel>Operator</FormLabel>
                <Input value={"Greater than Equal"} disabled fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel>Value</FormLabel>
                <Input value={value} onChange={(e) => setValue(e.target.value)} disabled fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel>Mint To</FormLabel>
                <Input
                  value={mintToAddress}
                  fontSize={"xs"}
                  disabled
                  onChange={(e) => setMintToAddress(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Button
              disabled={!connected || !mintToAddress || alreadyMinted}
              onClick={async () => {
                try {
                  if (!connected) {
                    throw new Error("not connected");
                  }
                  const parsedValue = Number(value);
                  // TODO: create zk proof here
                  const metaURI = "";
                  const claimHashMetadata = "0x0000000000000000000000000000000000000000000000000000000000000000";
                  const tx = await connected.privateSoulMinter.mint(mintToAddress, metaURI, claimHashMetadata);
                  console.log(tx.hash);
                } catch (e) {
                  handle(e);
                }
              }}
            >
              {!connected && "Connect Wallet"}
              {connected && !alreadyMinted && "Mint"}
              {connected && alreadyMinted && "Already Minted"}
            </Button>
          </Stack>
        </Stack>
      </Unit>
    </Layout>
  );
};

export default CreatePage;
