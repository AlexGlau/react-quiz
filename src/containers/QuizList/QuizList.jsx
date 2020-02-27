import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';
import axios from 'axios';


class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, i) => {
      return (
        <li key={i}>
          <NavLink
            to={'quiz/' + quiz}
          >
            Test {quiz}
          </NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    axios.get('https://react-quiz-8adb2.firebaseio.com/quiz.json').then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>

          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
