import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/login';
import ForgotPassword from './pages/forgot-password/forgotPassword';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </BrowserRouter>
    )
}
