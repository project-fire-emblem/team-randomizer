import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Pages from './pages';

import AppAPI from './services/appApi';

import Navbar from './components/navigation/MainNavbar';
import References from './components/navigation/MainReferences';
import { ProtectedRoute } from './components/navigation/ProtectedRoute';

interface AppState {
  isAuthenticated: boolean;
}

class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  public componentDidMount = () => {
    this.mountedLoginHandler();
    console.log('finished');
  };

  private mountedLoginHandler = () => {
    let key = 'feAppToken';
    let token = localStorage.getItem(key);
    if (token == null) {
      // throw an error if the recieved value was not found.
      localStorage.removeItem(key);
      // FIXME: Not sure if needed in the future
      // throw new Error(`Value from ${key} cannot be found. ${key} was deleted.`);
    } else if (this.validateToken(token)) {
      // get the token and set the api "authorization" header
      AppAPI.defaults.headers.Authorization = `Bearer ${token}`;
      // set the isAuthenticated to true
      this.setState({ isAuthenticated: true });
    } else {
      // token is not valid, remove it.
      localStorage.removeItem(key);
    }
  };

  private loginHandler = (token: string) => {
    let key = 'feAppToken';
    if (this.validateToken(token)) {
      localStorage.setItem(key, token);
      // get the token and set the api "authorization" header
      AppAPI.defaults.headers.Authorization = `Bearer ${token}`;
      // set the isAuthenticated to true
      this.setState({ isAuthenticated: true });
    }
  };

  private validateToken = (token: string): boolean => {
    const decodedToken = jwt.decode(token);
    if (decodedToken == null || typeof decodedToken === 'string') {
      return false;
    }
    const currentTime = Date.now() / 1000;
    const expTime: number = decodedToken.exp;
    console.log(decodedToken);
    if (expTime - currentTime > 0) {
      return true;
    }
    return false;
  };

  private logoutHandler = () => {
    this.setState({ isAuthenticated: false });
  };

  public render() {
    const { isAuthenticated } = this.state;
    const { Home, Auth, TeamRandomizer, FourOhFour } = Pages;
    return (
      <BrowserRouter>
        <header>
          <Navbar isAuth={isAuthenticated} />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/account"
            render={props => (
              <Auth
                {...props}
                loginHandler={this.loginHandler}
                logoutHandler={this.logoutHandler}
              />
            )}
          />
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
      </BrowserRouter>
    );
  }
}

export default App;
