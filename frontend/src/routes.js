import React from 'react';
import { isAuthenticated, logout } from './services/auth'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/login';
import UserRegistration from './pages/UserRegistration/UserRegistration'
import ForgotPassword from './pages/forgot-password/forgotPassword';
import Dashboard from './pages/Dashboard/Dashboard'
//ImportRouter

const PrivateRouter = ({ component: Component, ...rest}) => (
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
)


const Routes = () => (
    <BrowserRouter>
        <Switch>isAuthenticated
            <Route path="/" exact component={Login}/>
            <Route path="/UserRegistration" component={UserRegistration} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRouter path="/Dashboard" component={Dashboard}/>
            RouterGeneric
            </Switch>
    </BrowserRouter>
)


export default Routes