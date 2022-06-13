import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { BigNumber } from "ethers";
import { Claim } from "./types";

export async function generateClaimSignatures(
  claims: Claim[],
  guard: TypedDataSigner,
  chainId: number,
  boostId: BigNumber,
  verifyingContract: string
) {
  const sigs: string[] = [];

  const EIP712Domain = {
    name: "boost",
    version: "0.1.0",
    chainId,
    verifyingContract,
  };

  const EIP712Types = {
    Claim: [
      { name: "boostId", type: "uint256" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  };

  for (const claim of claims) {
    sigs.push(
      await guard._signTypedData(EIP712Domain, EIP712Types, {
        boostId,
        recipient: claim.recipient,
        amount: claim.amount,
      })
    );
  }

  return sigs;
}
