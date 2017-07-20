/**
 * Created by admin on 6/12/17.
 */
import React from 'react';
import AuthBundle from './AuthBundle';
import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    AuthBundle.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
  )}/>
);


export default PrivateRoute;
