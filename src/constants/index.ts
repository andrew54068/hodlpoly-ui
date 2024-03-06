const isMainnet = import.meta.env.VITE_NETWORK === 'mainnet'
export const FOMOPOLY_PROXY_ADDRESS = isMainnet ? '0x' : '0x68E331828dE32Fc9C1E921F160D31127850a991A';
export const FMP_PROXY_ADDRESS = isMainnet ? '0x' : '0xD47Ee70312688eDCC4eBAb1638aB8c07e1C7e4c2'