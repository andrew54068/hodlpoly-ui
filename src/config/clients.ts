


import { createPublicClient, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { getWalletClient } from '@wagmi/core'
import { wagmiConfig } from './index'


export const publicClient = createPublicClient({
  chain: baseGoerli,
  transport: http(),
})


export const getConnectedWalletClient = async ({ address }) => {
  return await getWalletClient(wagmiConfig, {
    chainId: baseGoerli.id,
    account: address
  })
}