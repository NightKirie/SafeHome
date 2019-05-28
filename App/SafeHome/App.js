import React from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer, createStackNavigator, } from 'react-navigation'; // Version can be specified in package.json

import LoadingPage from './src/screens/LoadingPage';
import VolunteerHomePage from './src/screens/Volunteer/VolunteerHomePage'
import UnprogressedCase from './src/screens/Volunteer/UnprogressedCase'

const AppNavigator = createStackNavigator({
    LoadingPage: LoadingPage,
    VolunteerHomePage: VolunteerHomePage,
    UnprogressedCase: UnprogressedCase,
});

export default createAppContainer(AppNavigator);
AppRegistry.registerComponent('SafeHome', () => AppNavigator);