// Router & pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// React hooks
import { useState, useEffect } from "react";

// Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import signed from "./reducers/signed";

// firebase
import app, { auth } from "./firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function App() {
  const store = configureStore(signed);

  return (
    <Provider store={store}>
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
