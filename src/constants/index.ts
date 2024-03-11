const isMainnet = import.meta.env.VITE_NETWORK === 'mainnet'
export const FOMOPOLY_PROXY_ADDRESS = isMainnet ? '0x' : '0x660c0B1E8D56E3Be50e1b5e328EAF18DE54DC464';
export const FMP_PROXY_ADDRESS = isMainnet ? '0x' : '0xD47Ee70312688eDCC4eBAb1638aB8c07e1C7e4c2'