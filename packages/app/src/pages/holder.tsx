import { Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { CredentialCard } from "@/components/CredentialCard";
import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";
import { useConnected } from "@/hooks/useConnected";
import { Credential } from "@/types/Credential";

const HolderPage: NextPage = () => {
  const { connected } = useConnected();
  const [credentials, setCredentials] = useState<Credential[]>([]);

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
                    <CredentialCard
                      key={i}
                      issuer={credential.issuer}
                      credentialType={credential.credentialType}
                      operator={credential.operator}
                      value={credential.value}
                    />
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
