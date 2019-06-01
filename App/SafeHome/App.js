import React from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer, createStackNavigator, } from 'react-navigation'; // Version can be specified in package.json

import LoginPage from './src/screens/LoginPage';
import VolunteerHomePage from './src/screens/Volunteer/VolunteerHomePage'
import UnprogressedCase from './src/screens/Volunteer/UnprogressedCase'

const AppNavigator = createStackNavigator({
    LoginPage: LoginPage,
    VolunteerHomePage: VolunteerHomePage,
    UnprogressedCase: UnprogressedCase,
});

export default createAppContainer(AppNavigator);
AppRegistry.registerComponent('SafeHome', () => AppNavigator);