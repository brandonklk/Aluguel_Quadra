import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login/Login';
import UserRegistration from './pages/UserRegistration/UserRegistration';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UserSchedules from './pages/UserSchedules/UserSchedules';
import ReserveSchedules from './pages/ReserveSchedules/ReserveSchedules';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="UserRegistration" component={UserRegistration} />
                <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
                <AppStack.Screen name="UserSchedules" component={UserSchedules} />
                <AppStack.Screen name="ReserveSchedules" component={ReserveSchedules} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
}