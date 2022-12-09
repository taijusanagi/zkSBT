import { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { QRCodeScannerModal, useQRCodeScannerModal } from "@/components/QRCodeScannerModal";

const HomePage: NextPage = () => {
  const qrCodeScannerModal = useQRCodeScannerModal();

  return (
    <Layout>
      <QRCodeScannerModal
        isOpen={qrCodeScannerModal.isOpen}
        onClose={qrCodeScannerModal.onClose}
        onScanSuccess={(result) => console.log(result)}
      />
    </Layout>
  );
};

export default HomePage;
