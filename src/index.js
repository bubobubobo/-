import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// style
import GlobalStyle from "./style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme, mixins } from "./style/theme";

// how to deploy
// firebase auth
// how to use gh-pages: https://github.com/gitname/react-gh-pages
// basename 설정: https://nomadcoders.co/community/thread/5722

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={{ ...theme, ...mixins }}>
      <App />
    </ThemeProvider>
  </>
);
