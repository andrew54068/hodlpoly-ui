import { createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { http } from "wagmi";
import { injected } from "wagmi/connectors";
import { blocto } from "@blocto/wagmi-connector";


export const walletConnectProjectId = '7a453bf7754ad57224095646ba5f2b93'
export const supportChains = [goerli]

export const wagmiConfig = createConfig({
  chains: [goerli],
  multiInjectedProviderDiscovery: false,
  connectors: [blocto(), injected()],
  ssr: true,
  transports: {
    [goerli.id]: http(),
  },
});

