import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button.jsx';

class Auth extends Component {

  loginHandler = () => {

  };

  signUpHandler = () => {

  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form>
            <input type="text"/>
            <input type="text"/>

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
