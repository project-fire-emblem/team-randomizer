import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavbar.scss';

const MainNavbar: React.FC = props => {
  return (
    <nav className="main-navbar">
      <ul>
        <li>
          <NavLink className="main-navbar__logo" activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/auth">
            Login/Signup
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/team-randomizer">
            Team Randomizer
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://github.com/project-fire-emblem/team-randomizer">GitHub &#62;</a>
        </li>
      </ul>
    </nav>
  );
};
export default MainNavbar;
