const isMainnet = import.meta.env.VITE_NETWORK === 'mainnet'
export const FOMOPOLY_PROXY_ADDRESS = isMainnet ? '0x' : '0x3f4D8B1124Ea549c8E9caD85E7E663084BD86F80';
export const FMP_PROXY_ADDRESS = isMainnet ? '0x' : '0xe17D8598CEa98F2f5281998d58033bd615fbc07C'