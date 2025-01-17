import { createConfig, webSocket } from 'wagmi'
import { blastSepolia, mainnet } from 'wagmi/chains'
import { http } from "wagmi";
import { injected } from "wagmi/connectors";
import { blocto } from "@blocto/wagmi-connector";

const appId = import.meta.env.VITE_APP_BLOCTO_APP_ID;

export const BLAST_RPC_URL = 'https://blast-sepolia.blockpi.network/v1/rpc/public'
export const walletConnectProjectId = '7a453bf7754ad57224095646ba5f2b93'
export const supportChains = [blastSepolia]

export const wagmiConfig = createConfig({
  chains: [blastSepolia, mainnet],
  multiInjectedProviderDiscovery: false,
  connectors: [blocto(appId), injected()],
  ssr: true,
  transports: {
    // [blastSepolia.id]: http(BLAST_RPC_URL),
    [blastSepolia.id]: webSocket('wss://blast-sepolia.drpc.org'),
    [mainnet.id]: http(),
  },
});
