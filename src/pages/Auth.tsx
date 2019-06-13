import React from 'react';

import PageLayout from '../layouts/PageLayout';
import AuthForm from '../containers/AuthForm';
import { RouteComponentProps } from 'react-router';

const Auth: React.FC<RouteComponentProps> = props => {
  return (
    <PageLayout>
      <AuthForm {...props} />
    </PageLayout>
  );
};

export default Auth;
