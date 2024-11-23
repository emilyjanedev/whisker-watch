import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import * as googleMapsApi from "./api/googleMaps.js";
import { APIProvider } from "@vis.gl/react-google-maps";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <APIProvider
        apiKey={googleMapsApi.apiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <CssBaseline />
        <App />
      </APIProvider>
    </ThemeProvider>
  </StrictMode>
);
