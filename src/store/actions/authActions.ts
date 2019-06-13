import AppAPI from '../../services/appApi';

import { validateToken } from '../../helpers/jwt';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOCAL_STORAGE_LOGIN = 'LOCAL_STORAGE_LOGIN',
  LOGOUT = 'LOGOUT',
  DEFAULT = 'DEFAULT',
}

// add a card (action creator)
export interface LoginAction {
  type: AuthActionTypes.LOGIN;
}

export interface LocalStorageLoginAction {
  type: AuthActionTypes.LOCAL_STORAGE_LOGIN | AuthActionTypes.DEFAULT;
}

export interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export interface Default {
  type: AuthActionTypes.DEFAULT;
}

// All interfaces in one action type
export type AuthActions = LoginAction | LocalStorageLoginAction | LogoutAction | Default;

export const login = (): LoginAction => {
  console.log('login');
  return {
    type: AuthActionTypes.LOGIN,
  };
};

export const localStorageLogin = (): LocalStorageLoginAction => {
  let key = 'feAppToken';
  let token = localStorage.getItem(key);
  if (token == null) {
    localStorage.removeItem(key);
  } else if (validateToken(token)) {
    // get the token and set the api "authorization" header
    AppAPI.defaults.headers.Authorization = `Bearer ${token}`;

    // set the isAuthenticated to true
    return {
      type: AuthActionTypes.LOCAL_STORAGE_LOGIN,
    };
  } else {
    // token is not valid, remove it.
    localStorage.removeItem(key);
  }
  // send back an empty action because nothing was found.
  return {
    type: AuthActionTypes.DEFAULT,
  };
};

export const logout = (): LogoutAction => {
  console.log('logout');
  let key = 'feAppToken';
  localStorage.removeItem(key);
  return {
    type: AuthActionTypes.LOGOUT,
  };
};

/**
 * Example of an async request inside of an action
 */
// import { ActionCreator, Dispatch } from 'redux';
// import { ThunkAction } from 'redux-thunk';
// import { AuthState } from '../reducers/authReducers';

// export const login: ActionCreator<ThunkAction<any, AuthState, null, LoginAction>> = () => {
//   console.log('anything');
//   return (dispatch: Dispatch) => {
//     console.log(dispatch);
//     try {
//       dispatch({
//         type: AuthActionTypes.LOGIN,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };
