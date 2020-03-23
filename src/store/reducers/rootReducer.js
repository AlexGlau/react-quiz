import { combineReducers } from 'redux';

import quizReducer from './quiz.js';


export default combineReducers({
  quiz: quizReducer
});
