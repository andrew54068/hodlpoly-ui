import { createContext } from "react";
import { SelectingLandPurpose } from "src/types";

export const GlobalContext = createContext<{
  account: string | null;
  setAccount: (account: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  chainId: string | null;
  setChainId: (chainId: string | null) => void;
  selectingLandPurpose: SelectingLandPurpose | null,
  setSelectingLandPurpose: (selectingLandPurpose: SelectingLandPurpose | null) => void,


}>({
  account: null,
  setAccount: () => undefined,
  userId: null,
  setUserId: () => undefined,
  chainId: null,
  setChainId: () => undefined,
  selectingLandPurpose: null,
  setSelectingLandPurpose: () => undefined,
});
