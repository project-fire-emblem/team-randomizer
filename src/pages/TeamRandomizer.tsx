import React, { Component } from 'react';

import PageLayout from '../layouts/PageLayout';

import CharacterList from '../containers/CharacterList';

export class TeamRandomizer extends Component {
  public render() {
    return (
      <PageLayout>
        <CharacterList />
      </PageLayout>
    );
  }
}

export default TeamRandomizer;
