import { Stack } from "@chakra-ui/react";
import { NextPage } from "next";

import { Credential } from "@/components/Credential";
import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";

const HolderPage: NextPage = () => {
  return (
    <Layout>
      <Unit header={"zkSBT Holder App"}>
        <Stack>
          <Credential
            issuer={"0x29893eEFF38C5D5A1B2F693e2d918e618CCFfdD8"}
            credentialType="Blockchain Week Taipei Attendee"
            operator={"="}
            value={"True"}
          />
          <Credential
            issuer={"0x29893eEFF38C5D5A1B2F693e2d918e618CCFfdD8"}
            credentialType="AgeVerification"
            operator={">="}
            value={"18"}
          />
        </Stack>
      </Unit>
    </Layout>
  );
};

export default HolderPage;
