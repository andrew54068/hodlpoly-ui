import { useContext, useCallback } from 'react';
import { useAccount } from "wagmi";
import LoginContext from "src/context/login";



export default function useCheckLogin() {
  const { address } = useAccount();

  const { onLoginModalOpen } =
    useContext(LoginContext);

  const checkUserLogin = useCallback(() => {
    if (!address) {
      onLoginModalOpen();
    }

    return !!address;
  }
    , [address, onLoginModalOpen])


  return checkUserLogin
}