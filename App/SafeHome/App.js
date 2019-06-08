import React from 'react';
import { AppRegistry } from 'react-native';
import { 
    createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
} from 'react-navigation'; // Version can be specified in package.json

import LoadingPageSwitchNavigation from './src/screens/LoadingPageSwitchNavigation';

export default createAppContainer(LoadingPageSwitchNavigation);
AppRegistry.registerComponent('SafeHome', () => AppNavigator);