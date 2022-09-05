import { createReducer } from "@reduxjs/toolkit";

const initState = { nickname: "", isSigned: false };

const signed = createReducer(initState, {
  SIGNIN: (_, action) => ({
    nickname: action.payload,
    isSigned: true,
  }),
  LOGOUT: (_, action) => ({
    nickname: action.payload,
    isSigned: false,
  }),
});

export default signed;
