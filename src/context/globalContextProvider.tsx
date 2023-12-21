import React, { useState } from "react";
import { GlobalContext } from "./global";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <GlobalContext.Provider
      value={{
        account: account,
        setAccount: setAccount,
        userId: userId,
        setUserId: setUserId
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
