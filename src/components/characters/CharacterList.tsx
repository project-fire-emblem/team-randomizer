import React, { Component } from 'react';

import CharacterCard from './CharacterCard';

import { Character } from '../../interfaces/Model.interface';

import './CharacterList.scss';

interface CharacterListProps {
  characters: Character[];
}

export class CharacterList extends Component<CharacterListProps, {}> {
  public constructor(props: CharacterListProps) {
    super(props);
  }
  public render() {
    const { characters } = this.props;
    return (
      <div className="character-list">
        {characters.map((character, i) => {
          return (
            <CharacterCard
              key={i}
              name={character.name}
              title={character.title}
              origin={character.origin}
            />
          );
        })}
      </div>
    );
  }
}

export default CharacterList;
