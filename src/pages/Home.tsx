import React, { Component } from 'react';

import PageLayout from '../layouts/PageLayout';

export class Home extends Component {
  public render() {
    return (
      <PageLayout>
        <h1>Welcome to the Fire Emblem team builder</h1>
        <h2>Go Sign in to see your team options</h2>
      </PageLayout>
    );
  }
}

export default Home;
