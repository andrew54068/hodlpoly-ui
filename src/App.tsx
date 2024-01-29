import { Route, Routes, useLocation } from "react-router-dom";
import theme from "./theme";
import { useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import NotFound from "src/components/NotFound";
import Main from "src/components/Main";
import { GlobalProvider } from "./context/globalContextProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'src/types'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig, walletConnectProjectId, supportChains } from 'src/config'
import { baseGoerli } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import { EthereumClient } from '@web3modal/ethereum'
import { BloctoWeb3ModalConfig } from '@blocto/web3modal-connector'

const queryClient = new QueryClient()
const ethereumClient = new EthereumClient(wagmiConfig, supportChains)

function App() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  useEffect(() => {
  }, [pathname]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ChakraProvider theme={theme}>
            <Box margin="0 auto" width="100%" bgColor={isLanding ? "white" : "#EEF1F5"}>
              <Navbar />
              <Box margin="0 auto" maxW={isLanding ? "100%" : `520px`}>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
            </Box>
          </ChakraProvider>
        </GlobalProvider>
      </QueryClientProvider>
      <Web3Modal
        {...BloctoWeb3ModalConfig}
        projectId={walletConnectProjectId}
        defaultChain={baseGoerli}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
  );
}

export default App;
