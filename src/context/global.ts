import { createContext } from "react";

export const GlobalContext = createContext<{
  account: string | null;
  setAccount: (account: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}>({
  account: null,
  setAccount: () => undefined,
  userId: null,
  setUserId: () => undefined,
});
