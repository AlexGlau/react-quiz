import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/AcitveQuiz.jsx';


class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'What color is the sky?',
        id: 1,
        rightAnswer: 3,
        answers: [
          {text: 'Black', id: 1},
          {text: 'Green', id: 2},
          {text: 'Blue', id: 3},
          {text: 'Pink', id: 4}
        ]
      },
      {
        question: 'How many months in a year?',
        id: 2,
        rightAnswer: 4,
        answers: [
          {text: '19', id: 1},
          {text: '13', id: 2},
          {text: '11', id: 3},
          {text: '12', id: 4}
        ]
      }
    ]
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswer === answerId) {
      this.setState({
        answerState: {[answerId]: 'success'}
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log('Finished');
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
          window.clearTimeout(timeout);
        }, 1000);
    } else {
      this.setState({
        answerState: {[answerId]: 'error'}
      });
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer the all questions</h1>
          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
