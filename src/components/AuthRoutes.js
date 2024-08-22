import React from 'react';
import { Route } from 'react-router-dom';

const AuthRoute = props => {
  const { component: Component, ...rest } = props;
  React.useEffect(() => {
    checkAuth()
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/contacts';
    }
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
          <Component {...matchProps} />
      )}
    />
  );
};


export default AuthRoute;
