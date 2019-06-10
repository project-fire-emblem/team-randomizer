import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/MainNavbar.scss';

interface MainNavbarProps {
  isAuth: boolean;
}

const MainNavbar: React.FC<MainNavbarProps> = ({ isAuth }) => {
  return (
    <nav className="main-navbar">
      <ul>
        <li>
          <NavLink className="main-navbar__logo" activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        {isAuth && (
          <li>
            <NavLink activeClassName="active" to="/teams">
              Teams
            </NavLink>
          </li>
        )}
      </ul>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/account">
            Account
          </NavLink>
        </li>
        <li>
          <a href="https://github.com/project-fire-emblem/team-randomizer">GitHub &#62;</a>
        </li>
      </ul>
    </nav>
  );
};
export default MainNavbar;
