import React from 'react';
import { isAuthenticated, logout, getToken } from './services/auth'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './component/Nav'

import Login from './pages/Login/login';
import UserRegistration from './pages/UserRegistration/UserRegistration'
import ForgotPassword from './pages/forgot-password/forgotPassword';
import Dashboard from './pages/Dashboard/Dashboard'
import TennisCourts from './pages/TennisCourts/TennisCourts'
import UserEdition from './pages/UserEdition/UserEdition'
//ImportRouter

const PrivateRouter = ({ component: Component, ...rest}) => (
    <div>
        <Nav id={getToken()} logout={logout}/>
        <Route 
            {...rest} 
            render={ props => (
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/', state: {form: props.location} }} />
                )
            )} 
        />
    </div>
)


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/UserRegistration" component={UserRegistration} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRouter path="/Dashboard" component={Dashboard}/>
            <PrivateRouter path="/TennisCourts" component={TennisCourts} />
            <PrivateRouter path="/UserEdition" component={UserEdition} />
				RouterGeneric
        </Switch>
    </BrowserRouter>
)


export default Routes