import { createReducer } from "@reduxjs/toolkit";

const initState = { questionList: [], selected: [] };

const question = createReducer(initState, {
  INIT_QUESTIONS: (state, action) => {
    return {
      ...state,
      questionList: action.payload,
    };
  },
  GET_NEW_QUESTION: (state, action) => {
    const idx = action.payload;
    const { questionList, selected } = state;
    return {
      questionList: questionList.filter((_, i) => i !== idx),
      selected: [questionList[idx], ...selected],
    };
  },
});

export default question;
