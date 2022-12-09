/* eslint-disable camelcase */
import fs from "fs";
import { ethers, network } from "hardhat";
import path from "path";

import networkJsonFile from "../network.json";
import { PrivateSoulMinter__factory, Verifier__factory } from "../typechain-types";
import { ChainId } from "../types/network";

async function main() {
  const signer = await ethers.provider.getSigner();
  const signerAddress = await signer.getAddress();
  console.log("signerAddress", signerAddress);
  const chainId = String(network.config.chainId) as ChainId;
  console.log("chainId", chainId);
  const PrivateSoulMinter = new PrivateSoulMinter__factory(signer);
  const privateSoulMinter = await PrivateSoulMinter.deploy();
  await privateSoulMinter.deployed();
  const Verifier = new Verifier__factory(signer);
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  const deployments = {
    privateSoulMinter: privateSoulMinter.address,
    verifier: verifier.address,
  };
  console.log("deployements", deployments);
  networkJsonFile[chainId].deployments = deployments;
  fs.writeFileSync(path.join(__dirname, `../network.json`), JSON.stringify(networkJsonFile));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
