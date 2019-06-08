import React from 'react';
import { 
    createAppContainer, 
    createSwitchNavigator,  
} from 'react-navigation'; // Version can be specified in package.json

import LoadingPage from './LoadingPage';
//import MainPageStackNavigation from './Main/MainPageStackNavigation';
//import LoginPage from './src/screens/Main/LoginPage';
import VolunteerBottomTabNavigation from './Main/Volunteer/VolunteerBottomTabNavigation'

const LoadingPageSwitchNavigation = createSwitchNavigator({
    LoadingPage: {
        screen: LoadingPage,
    },
    VolunteerBottomTabNavigation: {
        screen: VolunteerBottomTabNavigation,
    },
});

export default LoadingPageSwitchNavigation;