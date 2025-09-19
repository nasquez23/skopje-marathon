import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import QueryProvider from "./contexts/QueryProvider.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: { main: "#3a3d90", contrastText: "#ffffff" },
    secondary: { main: "#ff7535", contrastText: "#ffffff" },
    text: {
      primary: "#181819",
      secondary: "#4A5568",
    },
    background: {
      default: "#F7FAFC",
      paper: "#ffffff",
    },
    divider: "#EDF2F7",
    info: { main: "#d5d4ef" },
    grey: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#d5d4ef",
      300: "#718096",
      400: "#4A5568",
      700: "#2D3748",
      900: "#181819",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#181819",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 9999 },
      },
    },
  },
  shape: { borderRadius: 12 },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </Router>
  </StrictMode>
);
