import { createReducer } from "@reduxjs/toolkit";

const initState = { nickname: "", isSigned: false };

const signed = createReducer(initState, {
  SIGNIN: (state, action) => ({
    nickname: action.payload,
    isSigned: true,
  }),
  LOGOUT: (state, action) => ({
    nickname: action.payload,
    isSigned: false,
  }),
});

export default signed;
