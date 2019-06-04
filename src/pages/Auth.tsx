import React, { Component } from 'react';

import PageLayout from '../layouts/PageLayout';
import { AuthForm } from '../components/forms/AuthForm';
import { RouteComponentProps } from 'react-router';

interface AuthProps extends RouteComponentProps<{}> {
  loginHandler: Function;
  logoutHandler: Function;
}

export class Auth extends Component<AuthProps, {}> {
  private loginHandler = (token: string) => {
    this.props.loginHandler(token);
    this.props.history.push('/teams');
  };
  public render() {
    return (
      <PageLayout>
        <AuthForm loginHandler={this.loginHandler} logoutHandler={this.props.logoutHandler} />
      </PageLayout>
    );
  }
}

export default Auth;
