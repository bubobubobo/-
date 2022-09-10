import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// style
import GlobalStyle from "./style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme, mixins } from "./style/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={{ ...theme, ...mixins }}>
      <App />
    </ThemeProvider>
  </>
);
