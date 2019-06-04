import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  component: typeof React.Component;
  isAuthenticated: boolean;
  redirectPath: string;
}

/**
 * Higher Order Component that wraps the Router component to obfuscate authentication in routes.
 * @param props Props Variables
 * @param props.component Rendered component
 * @param props.isAuthenticated Authenticated flag
 */
export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  redirectPath,
  ...rest
}: ProtectedRouteProps) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: `${redirectPath}`, state: { from: props.location } }} />
      )
    }
  />
);
