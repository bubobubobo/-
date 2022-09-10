// Router & pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";

// style
import { createGlobalStyle } from "styled-components";

// for body style
const GlobalStyle = createGlobalStyle`
  body {
    margin: initial;
  }
`;

function App() {
  const store = configureStore({ reducer });

  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
