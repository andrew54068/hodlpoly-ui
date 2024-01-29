import { createConfig, configureChains } from 'wagmi'
import { baseGoerli } from 'wagmi/chains'
import { w3mConnectors } from "@web3modal/ethereum";
import { BloctoConnector } from '@blocto/web3modal-connector'
import { publicProvider } from 'wagmi/providers/public'

export const walletConnectProjectId = '7a453bf7754ad57224095646ba5f2b93'

// export const config = createConfig({
//   chains: [mainnet, baseGoerli],
//   transports: {
//     [mainnet.id]: http(),
//     [baseGoerli.id]: http(),
//   },
//   connectors: [
//     // injected(),
//     walletConnect({ projectId, }),
//     // safe(),
//   ]
// })
export const supportChains = [baseGoerli]

const { chains, publicClient } = configureChains(
  supportChains,
  [publicProvider()],
)



export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    new BloctoConnector({ chains }),
    ...w3mConnectors({ chains, projectId: walletConnectProjectId })
  ],
  publicClient,
});

