import React from 'react';
import ReactDOM from 'react-dom';

/* Make the store available to all container 
components in the application without passing it explicitly */
import { Provider } from 'react-redux';

// Store type from Redux
import { Store } from 'redux';

// Import the store function and state
import { configureStore, StoreState } from './store';

// import mounted login for a dispatch here.
import { localStorageLogin } from './store/actions/authActions';

import App from './App';
import './index.scss';

interface RootProps {
  store: Store<StoreState>;
}

const Root: React.FC<RootProps> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

const store = configureStore();
store.dispatch(localStorageLogin());

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
