import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Hompage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contacts from './pages/Contacts';
import Contact from './pages/Contact';
import ViewContact from './pages/ViewContact';


const Router = () => {
  return (
    <BrowserRouter>
        <Route path="/" exact component={Homepage} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/contacts" exact component={Contacts} layout={MainLayout} />
        <ProtectedRoute path="/contacts/:contactId/edit" exact component={Contact} layout={MainLayout} />
        <ProtectedRoute path="/contacts/create" exact component={Contact} layout={MainLayout} />
        <ProtectedRoute path="/contacts/:contactId/view" exact component={ViewContact} layout={MainLayout} />
        {/* <Route path="*" component={Signup} /> */}
    </BrowserRouter>
  )
}

export default Router
