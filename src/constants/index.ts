const isMainnet = import.meta.env.VITE_NETWORK === 'mainnet'
export const FOMOPOLY_PROXY_ADDRESS = isMainnet ? '' : '0xD2f84B732D73Ab6df566E3BC34BbA5bA3b519d17';
export const FMP_PROXY_ADDRESS = isMainnet ? '' : '0x64C593bA68A03750DeCee015066e104236BF9346'