import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { GlobalContext } from "./global";
import { SelectingLandPurpose } from "src/types";


export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isWaitingForMoving, setIsWaitingForMoving] = useState< boolean>(false);
  const [selectingLandPurpose, setSelectingLandPurpose] = useState<SelectingLandPurpose | null>(null);
  const { isOpen: isConnectModalOpen, onOpen: onConnectModalOpen, onClose: onConnectModalClose } = useDisclosure()

  return (
    <GlobalContext.Provider
      value={{
        account: account,
        setAccount: setAccount,
        userId: userId,
        setUserId: setUserId,
        chainId,
        setChainId,
        isConnectModalOpen,
        onConnectModalOpen,
        onConnectModalClose,
        selectingLandPurpose,
        setSelectingLandPurpose,
        isWaitingForMoving,
        setIsWaitingForMoving
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
