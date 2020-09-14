import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/login';
import UserRegistration from './pages/UserRegistration/UserRegistration'
//ImportRouter

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/UserRegistration" component={UserRegistration} />
RouterGeneric
            </Switch>
        </BrowserRouter>
    )
}
