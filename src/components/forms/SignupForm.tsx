import React, { Component } from 'react';

import { AuthCredentials } from '../../interfaces/Model.interface';

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
      this.submitForm();
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

export default SignupForm;
