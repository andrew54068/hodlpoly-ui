import { defineChain } from "viem/utils";


export const zircuitTestnet = /*#__PURE__*/ defineChain({
    id: 48_899,
    name: 'Zircuit Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://zircuit1.p2pify.com/'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Zircuit explorer',
        url: 'https://explorer.zircuit.com',
      },
    },
    testnet: true,
  })