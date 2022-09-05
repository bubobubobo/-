import { createAction } from "@reduxjs/toolkit";

const initQuestions = createAction("INIT_QUESTIONS");
const getNewQuestion = createAction("GET_NEW_QUESTION");

export { initQuestions, getNewQuestion };
