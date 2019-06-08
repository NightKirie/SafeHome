import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation'
import VolunteerHomePageStackNavigation from './VolunteerHomePage/VolunteerHomePage'
import VolunteerAlertPageStackNavigation from './VolunteerAlertPage/VolunteerAlertPage'
import VolunteerSettingPageStackNavigation from './VolunteerSettingPage/VolunteerSettingPage'


export default VolunteerBottomTabNavigation = createBottomTabNavigator({
    VolunteerHomePageStackNavigation: {
        screen: VolunteerHomePageStackNavigation,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='view-grid'
                    type="material-community"
                    color='#F37021'/>
            ),
        },  
    },
    VolunteerAlertPageStackNavigation: {
        screen: VolunteerAlertPageStackNavigation,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='bell'
                    type="material-community"
                    color='#F37021'/>
            ),
        }, 
    },
    VolunteerSettingPageStackNavigation: {
        screen: VolunteerSettingPageStackNavigation,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='account'
                    type="material-community"
                    color='#F37021'/>
            ),
        }, 
    },
},{
    tabBarOptions: { 
        showLabel: false,
        activeBackgroundColor: '#F2F1EF',
        inactiveBackgroundColor: '#FFFFFF',
    },
});



