import axios from '../../axios/axios-quiz.js';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes.js';


export function fetchQuizes() {
  return async dispatch => {

    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get('quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Test #${i + 1}`
        });
      });

      dispatch(fetchQuizesSuccess(quizes));

    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));

    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: error
  }
}

export function quizSetState(answerState, result) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    result
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

export function quizAnswerClick(answerId) {
  console.log('first asnwerId: ', answerId);

  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    console.log('question: ', question);
    const results = state.results;
    console.log('results: ', results);


    if (question.rightAnswerId === answerId) {
      console.log('question id: ', question.id);
      console.log('answerId: ', answerId);
      console.log('results[question.id]: ', results[question.id]);

      if (!results[question.id]) {
        // console.log('results[question.id]: ', results[question.id]);
        results[question.id] = 'success';
      }

      dispatch(quizSetState({[answerId]: 'success'}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
