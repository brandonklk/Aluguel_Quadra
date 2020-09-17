import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/login';
import UserRegistration from './pages/UserRegistration/UserRegistration'
import ForgotPassword from './pages/forgot-password/forgotPassword';
import Dashboard from './pages/Dashboard/Dashboard'
//ImportRouter

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/UserRegistration" component={UserRegistration} />
                <Route path="/forgot-password" component={ForgotPassword} />
                				<Route path="/Dashboard" component={Dashboard} />
				RouterGeneric
            </Switch>
        </BrowserRouter>
    )
}
