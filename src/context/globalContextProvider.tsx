import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { GlobalContext } from "./global";
import MoveContext from "./move";
import LoginContext from "./login";
import { SelectingLandPurpose } from "src/types";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [currentMoveSteps, setCurrentMoveSteps] = useState<number>(0);
  const [isWaitingForMoving, setIsWaitingForMoving] = useState<boolean>(false);
  const [selectingLandPurpose, setSelectingLandPurpose] =
    useState<SelectingLandPurpose | null>(null);
  const {
    isOpen: isConnectModalOpen,
    onOpen: onConnectModalOpen,
    onClose: onConnectModalClose,
  } = useDisclosure();
  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();

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
      }}
    >
      <LoginContext.Provider
        value={{
          isLoginModalOpen,
          onLoginModalOpen,
          onLoginModalClose,
        }}
      >
        <MoveContext.Provider
          value={{
            setCurrentMoveSteps,
            currentMoveSteps,
            isWaitingForMoving,
            setIsWaitingForMoving,
          }}
        >
          {children}
        </MoveContext.Provider>
      </LoginContext.Provider>
    </GlobalContext.Provider>
  );
};
