import React from 'react';
import {  
    createSwitchNavigator,  
} from 'react-navigation'; // Version can be specified in package.json

import MainRegisterPageStackNavigation from './LoadingPage';
import VolunteerBottomTabNavigation from './Main/Volunteer/VolunteerBottomTabNavigation'
//import HomeownerBottomNavigation from './Main/Homeowner/HomeownerBottomTabNavigation'

const LoadingPageSwitchNavigation = createSwitchNavigator({
    MainRegisterPageStackNavigation: {
        screen: MainRegisterPageStackNavigation,
    },
    VolunteerBottomTabNavigation: {
        screen: VolunteerBottomTabNavigation,
    },
    // HomeownerBottomNavigation: {
    //     screen: HomeownerBottomNavigation,
    // },
});

export default LoadingPageSwitchNavigation;