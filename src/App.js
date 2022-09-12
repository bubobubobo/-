// Router & pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

// Redux
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);
// used custom middleware not to check if reducer is serializable
// https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
const customMiddleware = getDefaultMiddleware({ serializableCheck: false });
const store = configureStore({
  reducer: persistedReducer,
  middleware: customMiddleware,
});

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
