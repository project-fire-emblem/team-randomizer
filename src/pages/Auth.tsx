import React, { Component } from 'react';

import PageLayout from '../layouts/PageLayout';
import AuthForm from '../containers/AuthForm';
import { RouteComponentProps } from 'react-router';

export class Auth extends Component<RouteComponentProps, {}> {
  public render() {
    return (
      <PageLayout>
        <AuthForm {...this.props} />
      </PageLayout>
    );
  }
}

export default Auth;
