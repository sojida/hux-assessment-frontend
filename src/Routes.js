import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoutes';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Hompage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contacts from './pages/Contacts';
import Contact from './pages/Contact';
import ViewContact from './pages/ViewContact';


const Router = () => {
  return (
    <Switch>
        <Route path="/" exact component={Homepage} />
        <AuthRoute path="/signup" exact component={Signup} />
        <AuthRoute path="/login" exact component={Login} />
        <ProtectedRoute path="/contacts" exact component={Contacts} layout={MainLayout} />
        <ProtectedRoute path="/contacts/:contactId/edit" exact component={Contact} layout={MainLayout} />
        <ProtectedRoute path="/contacts/create" exact component={Contact} layout={MainLayout} />
        <ProtectedRoute path="/contacts/:contactId/view" exact component={ViewContact} layout={MainLayout} />
        <Redirect to="/not-found" />
    </Switch>
  )
}

export default Router
