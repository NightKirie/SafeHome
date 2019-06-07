import React from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation'; // Version can be specified in package.json

import LoginPage from './src/screens/LoginPage';
import VolunteerBottomTabNavigation from './src/screens/Volunteer/VolunteerBottomTabNavigation'
const AppNavigator = createSwitchNavigator({
    LoginPage: LoginPage,
    VolunteerBottomTabNavigation: VolunteerBottomTabNavigation,
});

export default createAppContainer(AppNavigator);
AppRegistry.registerComponent('SafeHome', () => AppNavigator);