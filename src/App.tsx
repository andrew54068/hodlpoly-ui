import { Route, Routes, useLocation } from "react-router-dom";
import theme from "./theme";
import { useEffect } from "react";

import { ChakraProvider, Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import NotFound from "src/components/NotFound";
import MainPage from "src/components/MainPage";
import { GlobalProvider } from "./context/globalContextProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'src/types'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from 'src/config'
import 'src/config/clients';



const queryClient = new QueryClient()

function App() {

  const { pathname } = useLocation();
  const isLanding = pathname === "/";


  useEffect(() => {
  }, [pathname]);

  return (
    <GlobalProvider>
      <WagmiProvider config={wagmiConfig}>

        <QueryClientProvider client={queryClient}>

          <ChakraProvider theme={theme}>
            <Box margin="0 auto" width="100%" bgColor={isLanding ? "white" : "#EEF1F5"}>
              <Navbar />
              <Box margin="0 auto" maxW={isLanding ? "100%" : `520px`}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
            </Box>
          </ChakraProvider>

        </QueryClientProvider>
      </WagmiProvider>
    </GlobalProvider >
  );
}


export default App