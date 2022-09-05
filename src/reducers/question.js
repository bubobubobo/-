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
    return {
      questionList: state.question.filter((_, i) => i !== idx),
      selected: [state.question[idx], ...state.selected],
    };
  },
});

export default question;
