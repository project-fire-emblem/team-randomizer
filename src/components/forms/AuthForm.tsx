import React, { Component, ReactElement } from 'react';

import AppAPI, { alertErrorHandler } from '../../services/appApi';
import { AuthCredentials } from '../../interfaces/Model.interface';
import './AuthForm.scss';

interface AuthFormState {
  currentForm: ReactElement;
}

interface AuthFormProps {
  loginHandler: Function;
  logoutHandler: Function;
}

export class AuthForm extends Component<AuthFormProps, AuthFormState> {
  public constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      currentForm: this.loginForm,
    };
  }

  private loginForm = <LoginForm loginHandler={this.props.loginHandler} />;
  private signupForm = <SignupForm />;

  private updateCurrentForm = (form: ReactElement) => {
    this.setState({ currentForm: form });
  };

  public render() {
    const { currentForm } = this.state;
    const { logoutHandler } = this.props;
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
          <button onClick={event => logoutHandler(event)}>Logout</button>
        </div>
        {currentForm}
      </div>
    );
  }
}

interface LoginFormProps {
  loginHandler: Function;
}

class LoginForm extends Component<LoginFormProps, AuthCredentials> {
  public constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      email: 'test@tester.com',
      password: 'tester',
    };
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // HACK: Getting around typing for set state...
    // never: will be the type we expect and nothing else.
    this.setState<never>({ [name]: value });
  };

  /**
   * Form submission strategy
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    const sanitizedCredentials = this.sanitizeForm(this.state);
    if (this.validateForm(sanitizedCredentials)) {
      const token = await this.submitForm();
      this.props.loginHandler(token);
    } else {
      // display errors
    }
  };

  private sanitizeForm = (credentials: AuthCredentials): AuthCredentials => {
    credentials.email.trim();
    credentials.password.trim();
    return credentials;
  };

  private validateForm = (credentials: AuthCredentials): boolean => {
    if (credentials.email.length === 0 || credentials.password.length === 0) {
      // TODO: return a specific error here for the fields that are wrong
      return false;
    }
    return true;
  };

  /**
   *
   */
  private submitForm = async (): Promise<string> => {
    // Submit Form
    const { email, password } = this.state;
    try {
      const data = (await AppAPI.post('/graphql', {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              token
            }
          }
        `,
      })).data.data;
      return data.login.token;
    } catch (err) {
      alertErrorHandler(err);
      throw err;
    }
  };

  public render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.handleInputChange}
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleInputChange}
          autoComplete="current-password"
          minLength={8}
        />

        <button type="submit">Login</button>
      </form>
    );
  }
}

class SignupForm extends Component<{}, AuthCredentials> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // HACK: Getting around typing for set state...
    // never: will be the type we expect and nothing else.
    this.setState<never>({ [name]: value });
  };

  private validateForm = (): boolean => {
    return true;
  };

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.validateForm()) {
      const submitSuccess: boolean = this.submitForm();
    } else {
      // display errors
    }
  };

  /**
   *
   */
  private submitForm = (): boolean => {
    // Submit Form
    return true;
  };

  public render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="signup-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.handleInputChange}
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleInputChange}
          autoComplete="new-password"
        />

        <button type="submit">Sign Up!</button>
      </form>
    );
  }
}
