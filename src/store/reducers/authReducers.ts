import { Reducer } from 'redux'; // Reducer type from redux
import { AuthActions, AuthActionTypes } from '../actions/authActions'; // List of actions and types we can choose from

// State type
export interface AuthState {
  isAuthenticated: boolean;
}

// Initial state
const initialAuthState: AuthState = {
  isAuthenticated: false,
};

export const authReducer: Reducer<AuthState, AuthActions> = (state = initialAuthState, action) => {
  console.log(action.type);
  switch (action.type) {
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.LOCAL_STORAGE_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AuthActionTypes.DEFAULT:
    default:
      return state;
  }
};

export default authReducer;
