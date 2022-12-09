# zkSBT

zKSBT for Privacy-Preserved Onchain Identity

![top](./docs/top.png)

## Overview

### Issuer

![issuer]

- Can create privacy-preserved SBTs using ZKP
- Can distribute the SBTs to target holders

### Holder

![holder](./docs/holder.png)

- Can display SBTs in the wallet
- Can verify the SBTs credential using ZKP

## QRCode Based Communication

![qrcode-communication](./docs/qrcode-communication.png)

### Issue

- The issuer generates QRCode and distributes it to the holder
- The holder scans QRCode
- The SBT is minted on-chain with ZKP

### Verify

- The verifier generates QRCode and distributes it to the holder
- The holder scans QRCode and submits the SBTs
- The SBT is verified on-chain with ZKP

## How It Works

### Verifiable Credential

![architecture-credential](./docs/architecture-credential.svg)

- Credential management is using [W3C verifiable credential model](https://www.w3.org/TR/vc-data-model/#ecosystem-overview).
- We are using SBTs as credential registry in this credential model

### ZKP

![architecture-zkp](./docs/architecture-zkp.png)

Our ZKP implementation is extended version of [this repo](https://github.com/enricobottazzi/ZK-SBT) which leverages Iden3.
