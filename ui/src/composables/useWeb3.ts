import { ref } from 'vue'
import { Signer, Wallet, Contract } from 'ethers'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'
import BOOST_ABI from '../Boost.json'
import ERC20_ABI from '../ERC20.json'
import { e2e } from "../../../package.json";

declare var window: any

const BOOST_ADDRESS = '0xc0528d60fad1bb18e6d487ef1633d9b91b856f4a'

const isE2E = import.meta.env.MODE == 'e2e'

const provider = isE2E
  ? new JsonRpcProvider('http://localhost:8545')
  : new Web3Provider(window.ethereum)

const boostContract: Contract = new Contract(BOOST_ADDRESS, BOOST_ABI, provider)
const account = ref<string | null>(null)
const signer = ref<Signer | null>(null)

const connect = async () => {
  if (isE2E) {
    signer.value = new Wallet(e2e.pk)
    account.value = await signer.value.getAddress()
  } else {
    signer.value = provider.getSigner()
    const accounts = await provider.send("eth_requestAccounts", [])
    account.value = accounts[0]
  }
}

const getTokenContract = async (address: string) => {
  return new Contract(address, ERC20_ABI, provider);
}

export function useWeb3() {
  return {
    account,
    signer,
    boostContract,
    connect,
    getTokenContract,
    BigNumber
  }
}