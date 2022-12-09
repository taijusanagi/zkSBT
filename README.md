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

## Inspiration

### POAP and Kudos

We have a similar NFT distribution model with POAP and Kudos. POAP is proof of attendance and Kudos is the SBT version of POAP.
Our service provides more flexible credential types and leverages ZKP for user privacy.

### Polygon ID

We have a similar credential model with Polygon ID. Polygon ID is a verifiable credential management tool with ZKP and the credential is issued off-chain but verifiable on-chain.
Our service provides issue credential on-chain for better composability and still preserve user privacy with ZKP.

### Composability

We are not being the competitor of those existing great services.
We can have zkSBT gateway for the above services so that we can access the existing user-base too.
