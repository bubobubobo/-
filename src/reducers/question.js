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
  GET_SOLVED_QUESTION: (state, action) => {
    const id = action.payload;
    const { selected } = state;
    const targetIdx = selected.map((q) => q.id).indexOf(id);
    return {
      ...state,
      selected: [
        selected[targetIdx],
        ...selected.slice(0, targetIdx),
        ...selected.slice(targetIdx + 1),
      ],
    };
  },
  RESET_QUESTIONS: (state, action) => {
    return {
      questionList: [...state.selected],
      selected: [],
    };
  },
});

export default question;
