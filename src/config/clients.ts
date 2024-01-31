


import { createPublicClient, http } from 'viem'
import { baseGoerli } from 'viem/chains'
import { getWalletClient, getConnections } from '@wagmi/core'
import { wagmiConfig } from './index'


export const publicClient = createPublicClient({
  chain: baseGoerli,
  transport: http(),
})


export const getConnectedWalletClient = ({ address }) => {

  const connections = getConnections(wagmiConfig)
  const walletClient = getWalletClient(wagmiConfig, {
    chainId: baseGoerli.id,
    account: address,
    connector: connections[0]?.connector,
  })
  return walletClient

}