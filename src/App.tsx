import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { StoreState } from './store';

import Pages from './pages';

import Navbar from './components/navigation/MainNavbar';
import References from './components/navigation/MainReferences';
import { ProtectedRoute } from './components/navigation/ProtectedRoute';

interface AppProps {
  isAuthenticated: boolean;
}

const App: React.FC<AppProps> = ({ isAuthenticated }) => {
  const { Home, Auth, TeamRandomizer, FourOhFour } = Pages;

  return (
    <Router>
      <header>
        <Navbar isAuth={isAuthenticated} />
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Auth} />
        <ProtectedRoute
          path="/teams"
          component={TeamRandomizer}
          redirectPath="/account"
          isAuthenticated={isAuthenticated}
        />
        <Route component={FourOhFour} />
      </Switch>
      <footer>
        <References />
      </footer>
    </Router>
  );
};

const mapStateToProps = (store: StoreState) => {
  return {
    isAuthenticated: store.authState.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
