import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout.jsx';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Quiz from './containers/Quiz/Quiz.jsx';
import Auth from './containers/Auth/Auth.jsx';
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx';
import QuizList from './containers/QuizList/QuizList.jsx';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';


class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/' component={QuizList} />
          <Route path='/logout' component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default withRouter(connect(mapStateToProps)(App));
