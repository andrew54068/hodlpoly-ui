import { createContext } from "react";

const LoginContext = createContext<{
  onLoginModalClose: () => void,
  isLoginModalOpen: boolean,
  onLoginModalOpen: () => void,
}>({
  onLoginModalClose: () => undefined,
  isLoginModalOpen: false,
  onLoginModalOpen: () => undefined,

});


export default LoginContext