import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button.jsx';
import Input from '../../components/UI/Input/Input.jsx';
import axios from 'axios';


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const signInData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5ql78b15dYHc2INT9iFfSo37mP29eGDg',
          signInData
        );
        console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  signUpHandler = async () => {
    const signUpData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5ql78b15dYHc2INT9iFfSo37mP29eGDg',
          signUpData
        );
        console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = value.indexOf('@') > 0 && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    });

    this.setState({
      formControls,
      isFormValid
    })
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={control + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => {
            this.onChangeHandler(event, controlName)
          }}
        />
      );
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {this.renderInputs()}

              <Button
                type='success'
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Sign in
              </Button>
              <Button
                type='primary'
                onClick={this.signUpHandler}
                disabled={!this.state.isFormValid}
              >
                Sign up
              </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
