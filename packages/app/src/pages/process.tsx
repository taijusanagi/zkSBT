import { NextPage } from "next";
import { useState } from "react";

import { Layout } from "@/components/Layout";
import { Unit } from "@/components/Unit";

type Mode = "qrcode" | "scanned" | "result";

const ProcessPage: NextPage = () => {
  const [mode, setMode] = useState<Mode>("qrcode");

  return (
    <Layout>
      <Unit header={"Issue zkSBT"}>
        {mode === "qrcode" && <></>}
        {mode === "scanned" && <></>}
        {mode === "result" && <></>}
      </Unit>
    </Layout>
  );
};

export default ProcessPage;
