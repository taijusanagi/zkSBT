import { Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";
import { useConnected } from "@/hooks/useConnected";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { sleep } from "@/lib/utils";

const CreatePage: NextPage = () => {
  const { connected } = useConnected();

  const [credentialType] = useState("Age Verification");
  const [valueType] = useState("Number");
  const [operator] = useState("Greater than Equal");

  const [value, setValue] = useState<string>("18");
  const [mintToAddress, setMintToAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
                <Input value={credentialType} disabled fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel>Value Type</FormLabel>
                <Input value={valueType} disabled fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel>Operator</FormLabel>
                <Input value={operator} disabled fontSize="sm" />
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
              isLoading={isLoading}
              disabled={!connected || !mintToAddress || alreadyMinted}
              onClick={async () => {
                try {
                  if (!connected) {
                    throw new Error("not connected");
                  }
                  setIsLoading(true);
                  const parsedValue = Number(value);

                  console.log("input value...");

                  console.log("credentialType", credentialType);
                  console.log("valueType", valueType);
                  console.log("operator", operator);
                  console.log("value", parsedValue);

                  await sleep(1000);

                  const nftMetadataURI =
                    "https://bafybeibodo3cnumo76lzdf2dlatuoxtxahgowxuihwiqeyka7k2qt7eupy.ipfs.nftstorage.link/";
                  console.log("NFT metadata with public info is stored in IPFS", nftMetadataURI);

                  await sleep(3000);

                  console.log("claim and signature data to be stored off-chain");

                  console.log(
                    "Claim",
                    "180410020913331409885634153623124536270,0,18,0,0,0,328613907243889777235018884535160632327,0"
                  );

                  console.log(
                    "Signature",
                    "13692340849919074629431384397504503745238970557428973719013760553241945274451",
                    "18066895302190271072509218697462294016350129302467595054878773027470753683267",
                    "238898180964301975640138172772451490757586081215817420470161945050687067203"
                  );

                  await sleep(1000);

                  const claimHash = "0xfbaa3f5a157a7cbc9edc0927227144cf74248de5457337a88328a6dfec6d1ce6";
                  console.log("Hash of signature to be stored on-chain with SBT", claimHash);

                  await sleep(1000);

                  console.log("Now requesting to mint SBTs");
                  const tx = await connected.privateSoulMinter.mint(mintToAddress, nftMetadataURI, claimHash);
                  console.log(tx.hash);
                } catch (e) {
                  handle(e);
                } finally {
                  setIsLoading(false);
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
