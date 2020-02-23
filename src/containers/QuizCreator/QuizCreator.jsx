import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button.jsx';
import Input from '../../components/UI/Input/Input.jsx';
import { createControl } from '../../form/formFramework.js';
import Auxilary from '../../hoc/Auxilary/Auxilary.js';


function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMesssage: 'Option cannot be empty',
    id: number
  }, {required: true})
}

function createFormControls(params) {
  return  {
    question: createControl({
      label: 'Enter question',
      errorMesssage: 'Question field cannot be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: createFormControls()
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = () => {

  };

  createQuizHandler = () => {

  };

  changeHandler = (value, controlName) => {

  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxilary key={controlName + i}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMesssage={control.errorMesssage}
            onChange={(event) => {
              this.changeHandler(event.target.value, controlName)
            }}
          />
          {i === 0 ? <hr /> : null}
        </Auxilary>
      );
    });
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            <select></select>

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
            >
              Create test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
