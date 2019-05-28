import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Pages from './pages';

class App extends React.Component<{}, {}> {
  public render() {
    const { Home, Auth, TeamRandomizer, FourOhFour } = Pages;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/team-randomizer" component={TeamRandomizer} />
          <Route component={FourOhFour} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
