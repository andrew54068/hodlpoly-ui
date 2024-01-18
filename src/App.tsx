import { Route, Routes, useLocation } from "react-router-dom";
import theme from "./theme";
import { useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import NotFound from "src/components/NotFound";
import Main from "src/components/Main";
import { GlobalProvider } from "./context/globalContextProvider";

function App() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  useEffect(() => {
  }, [pathname]);

  return (
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
  );
}

export default App;
