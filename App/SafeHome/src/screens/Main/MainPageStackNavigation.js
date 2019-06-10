import React from 'react';
import { 
    createStackNavigator, 
} from 'react-navigation'; // Version can be specified in package.json

import LoginPage from './LoginPage';

const MainPageStackNavigation = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
    },
    RegisterPage: {
        screen: RegisterPage,
    },
});

export default MainPageStackNavigation;