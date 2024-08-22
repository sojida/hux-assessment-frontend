import React from 'react';
import { Route } from 'react-router-dom';

const ProtectedRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  React.useEffect(() => {
    // checkAuth()
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    }
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};


export default ProtectedRoute;
