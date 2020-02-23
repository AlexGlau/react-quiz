import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button.jsx';
import Input from '../../components/UI/Input/Input.jsx';

class Auth extends Component {

  state = {
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

  loginHandler = () => {

  };

  signUpHandler = () => {

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

    this.setState({
      formControls
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

          <form className={classes.AuthForm}>

            {this.renderInputs()}

              <Button
                type='success'
                onClick={this.loginHandler}
              >
                Sign in
              </Button>
              <Button
                type='primary'
                onClick={this.signUpHandler}
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
