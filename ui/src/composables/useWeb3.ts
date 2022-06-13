import { ref } from 'vue'
import { ethers } from 'ethers'
import { BigNumber } from 'ethers'
import BOOST_ABI from '../Boost.json'
import ERC20_ABI from '../ERC20.json'
import { Contract } from "@ethersproject/contracts";

const BOOST_ADDRESS = '0xc0528d60fad1bb18e6d487ef1633d9b91b856f4a'

declare var window: any
const provider = new ethers.providers.Web3Provider(window.ethereum)
const boostContract: Contract = new Contract(BOOST_ADDRESS, BOOST_ABI, provider)
const account = ref<string | null>(null)
const accountDisplay = ref<string | null>(null)
const signer = ref<ethers.Signer | null>(null)

const connect = async () => {
  const accounts = await provider.send("eth_requestAccounts", [])
  account.value = accounts[0]
  accountDisplay.value = (await provider.lookupAddress(account.value as string)) || account.value
  signer.value = provider.getSigner()
}

const getTokenContract = async (address: string) => {
  return new ethers.Contract(address, ERC20_ABI, provider);
}

export function useWeb3() {
  return {
    account,
    accountDisplay,
    signer,
    boostContract,
    connect,
    getTokenContract,
    BigNumber
  }
}