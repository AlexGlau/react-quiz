import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem.jsx';

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        return <AnswerItem key={index} answer={answer} />
      })}
    </ul>
  )
}

export default AnswersList;
