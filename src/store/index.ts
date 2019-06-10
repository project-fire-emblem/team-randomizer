// Full Credit: https://blog.usejournal.com/using-react-with-redux-and-typescript-c7ec48c211f6

import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { authReducer, AuthState } from './reducers/authReducers';

export interface StoreState {
  authState: AuthState;
}

// The reducers updates its entire respective section of state through reducing... Cool stuff
const rootReducer = combineReducers<StoreState>({
  authState: authReducer,
});

export const configureStore = (): Store<StoreState, any> => {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
};
