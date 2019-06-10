import React, { Component, ReactElement } from 'react';
import { RouteComponentProps } from 'react-router';

// Redux
import { connect } from 'react-redux';
import { StoreState } from '../store';
import { login, logout, AuthActions } from '../store/actions/authActions';

import { validateToken } from '../helpers/jwt';
import AppAPI from '../services/appApi';

import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignupForm';
import '../styles/AuthForm.scss';

interface AuthFormState {
  currentForm: ReactElement;
}

interface AuthFormProps extends RouteComponentProps<{}> {
  login: () => AuthActions;
  logout: () => AuthActions;
}

class AuthForm extends Component<AuthFormProps, AuthFormState> {
  private loginHandler = (token: string) => {
    let key = 'feAppToken';
    if (validateToken(token)) {
      localStorage.setItem(key, token);
      // get the token and set the api "authorization" header
      AppAPI.defaults.headers.Authorization = `Bearer ${token}`;
      // set the isAuthenticated to true

      login();
      // FIXME: This seems a little sketchy to put here.
      this.props.history.push('/teams');
    } else {
      logout();
    }
  };

  private logoutHandler = () => {
    logout();
    this.props.history.push('/');
  };

  private loginForm = <LoginForm loginHandler={this.loginHandler} />;
  private signupForm = <SignupForm />;

  private updateCurrentForm = (form: ReactElement) => {
    this.setState({ currentForm: form });
  };

  public constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      currentForm: this.loginForm,
    };
  }

  public render() {
    const { currentForm } = this.state;
    return (
      <div className="auth-form-container">
        <div className="auth-form-container__options">
          <button
            onClick={() => this.updateCurrentForm(this.loginForm)}
            className="auth-form-container__button"
          >
            Login
          </button>
          <button
            onClick={() => this.updateCurrentForm(this.signupForm)}
            className="auth-form-container__button"
          >
            Signup
          </button>
          <button onClick={() => this.logoutHandler()}>Logout</button>
        </div>
        {currentForm}
      </div>
    );
  }
}

const mapStateToProps = (store: StoreState) => {
  return {
    isAuthenticated: store.authState.isAuthenticated,
  };
};

export default connect(
  mapStateToProps,
  { login, logout },
)(AuthForm);
