import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/login';
import UserRegistration from './pages/UserRegistration/UserRegistration'
import ForgotPassword from './pages/forgot-password/forgotPassword';
//ImportRouter

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/UserRegistration" component={UserRegistration} />
                <Route path="/forgot-password" component={ForgotPassword} />
                RouterGeneric
            </Switch>
        </BrowserRouter>
    )
}
