import { createAction } from "@reduxjs/toolkit";

const signIn = createAction("SIGNIN");
const logOut = createAction("LOGOUT");

export { signIn, logOut };
