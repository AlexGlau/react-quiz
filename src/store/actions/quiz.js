import axios from '../../axios/axios-quiz.js';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR
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
