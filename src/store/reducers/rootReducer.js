import { combineReducers } from 'redux';

import quizReducer from './quiz.js';
import createReducer from './create.js';


export default combineReducers({
  quiz: quizReducer,
  create: createReducer
});
