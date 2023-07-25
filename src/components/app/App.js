import MainPage from "../pages/MainPage/MainPage";
import { Container, Stack } from "@mui/material";
import EnterPage from "../pages/enterPage";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import {
  deepPurple,
  green,
  grey,
  blue,
  yellow,
  deepOrange,
} from "@mui/material/colors";
import "./App.css";
import { useEffect, useState } from "react";
import { TokenContext } from "../../context/tokenContext";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const tooglePanel = () => {
    setIsMobile(false);
    setIsPanelOpen((isPanelOpen) => !isPanelOpen);
  };

  const [isMobile, setIsMobile] = useState(false);
  const onShowMobileMenu = () => {
    setIsPanelOpen(false);
    setIsMobile((isMobile) => !isMobile);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: yellow.A700,
      },
      warning: {
        main: green[800],
      },
      secondary: {
        main: grey[800],
        light: grey[50],
      },
      success: {
        main: blue[500],
      },
      ounWarning: {
        main: yellow[700],
      },
      fineshed: {
        main: deepOrange[900],
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: isPanelOpen ? 1000 : 780,
        md: isPanelOpen ? 1480 : 1055,
        lg: isPanelOpen ? 2100 : 1551,
        xl: 2101,
      },
    },
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  }, []);

  const onLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <SnackbarProvider maxSnack={5}>
      <ThemeProvider theme={theme}>
        <TokenContext.Provider value={token}>
          <Router>
            <Stack>
              {token ? (
                <MainPage
                  onLogOut={onLogOut}
                  isPanelOpen={isPanelOpen}
                  tooglePanel={tooglePanel}
                  isMobile={isMobile}
                  onShowMobileMenu={onShowMobileMenu}
                />
              ) : (
                <EnterPage onAuth={setToken} />
              )}
            </Stack>
          </Router>
        </TokenContext.Provider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
