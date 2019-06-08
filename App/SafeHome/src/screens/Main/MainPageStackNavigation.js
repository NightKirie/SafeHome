import React from 'react';
import { 
    createStackNavigator, 
} from 'react-navigation'; // Version can be specified in package.json

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const MainPageStackNavigation = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
    },
    RegisterPage: {
        screen: RegisterPage,
    },
});

export default MainPageStackNavigation;