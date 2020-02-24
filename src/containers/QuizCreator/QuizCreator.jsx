import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button.jsx';
import Input from '../../components/UI/Input/Input.jsx';
import Select from '../../components/UI/Select/Select.jsx';
import { createControl, validate, validateForm } from '../../form/formFramework.js';
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
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();
  };

  createQuizHandler = () => {

  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
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

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    });
  };

  render() {
    const select = <Select
      label="Choose correct answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: '1', value: 1},
        {text: '2', value: 2},
        {text: '3', value: 3},
        {text: '4', value: 4}
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            {select}

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
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
