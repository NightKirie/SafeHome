import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { AppRegistry } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import LoadingPage from './src/screens/LoadingPage';
import VolunteerFirstPage from './src/screens/Volunteer/VolunteerFirstPage'
import UnprogressedCase from './src/screens/Volunteer/UnprogressedCase'

const AppNavigator = createStackNavigator({
  LoadingPage: {
    screen: LoadingPage,
  },
  VolunteerFirstPage: {
    screen: VolunteerFirstPage
  },
  UnprogressedCase: {
    screen: UnprogressedCase,
  }
}, 
);

export default createAppContainer(AppNavigator);
AppRegistry.registerComponent('SafeHome', () => AppNavigator);