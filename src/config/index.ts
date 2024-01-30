import { createConfig } from 'wagmi'
import { baseGoerli } from 'wagmi/chains'
import { http } from "wagmi";
import { injected } from "wagmi/connectors";
import { blocto } from "@blocto/wagmi-connector";


export const walletConnectProjectId = '7a453bf7754ad57224095646ba5f2b93'
export const supportChains = [baseGoerli]

export const wagmiConfig = createConfig({
  chains: [baseGoerli],
  multiInjectedProviderDiscovery: false,
  connectors: [blocto(), injected()],
  ssr: true,
  transports: {
    [baseGoerli.id]: http(),
  },
});

