import React, { Component } from 'react';

import CharacterCard from '../components/CharacterCard';
import { Character } from '../interfaces/Model.interface';
import AppAPI, { alertErrorHandler } from '../services/appApi';

import '../styles/CharacterList.scss';

interface CharacterListProps {}

interface CharacterListState {
  characters: Character[];
}

export class CharacterList extends Component<CharacterListProps, CharacterListState> {
  private requestCharacters = async (): Promise<Character[]> => {
    try {
      const data = (await AppAPI.post('/graphql', {
        query: `
          query {
            characters {
              name
              origin
              title
            }
          }
        `,
      })).data.data;
      return data.characters;
    } catch (err) {
      alertErrorHandler(err);
    }
    return [];
  };

  public constructor(props: CharacterListProps) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  public componentDidMount = async () => {
    const characters = await this.requestCharacters();
    console.log(characters);
    this.setState({ characters });
  };

  public render() {
    const { characters } = this.state;
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
