import { createContext } from "react";

export const GlobalContext = createContext<{
  account: string | null;
  setAccount: (account: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  chainId: string | null;
  setChainId: (chainId: string | null) => void;
  isConnectModalOpen: boolean,
  onConnectModalOpen: () => void,
  onConnectModalClose: () => void,
}>({
  account: null,
  setAccount: () => undefined,
  userId: null,
  setUserId: () => undefined,
  chainId: null,
  setChainId: () => undefined,
  isConnectModalOpen: false,
  onConnectModalOpen: () => undefined,
  onConnectModalClose: () => undefined,
});
