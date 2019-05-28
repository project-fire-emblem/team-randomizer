import React from 'react';

import { Character } from '../../interfaces/Model.interface';

import './CharacterCard.scss';

const CharacterCard: React.FC<Character> = ({ name, title, origin }) => {
  return (
    <div className="character-card">
      <p>{name}</p>
      <p>{title}</p>
      <p>{origin}</p>
    </div>
  );
};

export default CharacterCard;
