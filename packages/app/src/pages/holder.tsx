import { Button, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { CredentialCard } from "@/components/CredentialCard";
import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";
import { useConnected } from "@/hooks/useConnected";
import { sleep } from "@/lib/utils";
import { Credential } from "@/types/Credential";

const HolderPage: NextPage = () => {
  const { connected } = useConnected();
  const [credentials, setCredentials] = useState<Credential[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!connected) {
      setCredentials([]);
      return;
    }
    connected.privateSoulMinter.souls(connected.signerAddress).then((tokenId) => {
      if (tokenId.gt(0)) {
        // this should check metadata and private data
        // hardcode for temp
        setCredentials([
          {
            issuer: connected.signerAddress,
            credentialType: "Age Verification",
            operator: ">=",
            value: "18",
          },
        ]);
      } else {
        setCredentials([]);
      }
    });
  }, [connected]);

  const calculateProofAndVerify = async () => {
    try {
      if (!connected) {
        throw new Error("not connected");
      }
      setIsLoading(true);
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

      console.log("calculate zk proof...");

      await sleep(7000);

      console.log(
        "A",
        "0x0a54b7c4cd80dbd97ac8d922ca9b060f7de3491de1fbbeb989683da0e02839c8",
        "0x1f1b1ca66cc3a18eb0054a8fb5048fe303f6e54138df6069421ee95434c03fa3"
      );
      console.log(
        "B",
        "0x1714347cf52da0a6f6827363dd892c89e19fa911cfade65958a619ed18173cfc",
        "0x2a2df9a2c655c6b22945560d1b27e6d7f7ef4b2b00dcc65779ab32dd71f1fa32",
        "0x1d487801e4e02cc915a945830e3a2630443e6d234a20f56b18073257f6ccfc67",
        "0x0ac6566d46211e8f645eacc726c6b68de6f64da8cb301adb930922fffc34b8eb"
      );
      console.log(
        "C",
        "0x236e2000c1322a463e3487f9b3b1e52cca776144c410cbfec6ed981ab9581fe7",
        "0x0544e1ff4871b9244ffaf2c8f6121b0bd5114b1921be0f95033a95c8d69b69ce"
      );
      console.log(
        "Pub Inputs",
        "0x1e45971cfa70dd24049a52ed676370475928989032a32d149617d7f2ab5f7853",
        "0x27f18017c97f468d034ed1c7635ea5d4c047f92f0f924c6ee391d9f28d9c5743",
        "0x0087362a05af70b285215b98ffea29b14d8a6dc3cc9249f280f95778dc6dd443",
        "0x152f5044240ef872cf7e6742fe202b9e07ed6188e9e734c09b06939704852358",
        "0x2865441cd3e276643c84e55004ad259dff282c8c47c6e8c151afacdadf6f6db3",
        "0x0000000000000000000000000000000087b9b4c689c2024c54d1bf962cb16bce",
        "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000000000000000000000000000003",
        "0x0000000000000000000000000000000000000000000000000000000000000012",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "..."
      );

      console.log("Verify with verifier contract", connected.verifier.address);
      await sleep(2000);

      console.log("Your identity is verified on-chain with ZKP!!");
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Unit header={"zkSBT Holder App"}>
        <Stack spacing="4">
          <Stack>
            <Stack spacing="1">
              <Text fontSize="xs" fontWeight={"bold"}>
                Sample zkSBT
              </Text>
              <Text fontSize="x-small" color="accent">
                * This is mock data for better demo
              </Text>
            </Stack>
            <CredentialCard
              issuer={"0x29893eEFF38C5D5A1B2F693e2d918e618CCFfdD8"}
              credentialType="Blockchain Week Taipei Attendee"
              operator={"="}
              value={"True"}
            />
          </Stack>
          {credentials.length > 0 && (
            <Stack>
              <Stack spacing="1">
                <Text fontSize="xs" fontWeight={"bold"}>
                  zkSBT in Wallet
                </Text>
                <Text fontSize="x-small" color="accent">
                  * Only one credential is allowed per wallet for easy demo
                </Text>
              </Stack>
              <Stack>
                {credentials.map((credential, i) => {
                  return (
                    <Stack key={i}>
                      <CredentialCard
                        issuer={credential.issuer}
                        credentialType={credential.credentialType}
                        operator={credential.operator}
                        value={credential.value}
                      />
                      <Button isLoading={isLoading} onClick={calculateProofAndVerify}>
                        Calculate Proof and Verify
                      </Button>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Unit>
    </Layout>
  );
};

export default HolderPage;
