import React, { Component } from 'react';

import PageLayout from '../layouts/PageLayout';

import CharacterList from '../components/characters/CharacterList';
import { Character } from '../interfaces/Model.interface';

const characters: Character[] = [];

for (let i = 0; i < 10; i++) {
  characters.push({
    name: 'Arthur',
    title: 'The Hapless Hero',
    origin: 'Fire Emblem: Awakening',
  });
}

export class TeamRandomizer extends Component {
  public render() {
    return (
      <PageLayout>
        <CharacterList characters={characters} />
      </PageLayout>
    );
  }
}

export default TeamRandomizer;
