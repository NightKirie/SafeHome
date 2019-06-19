import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation'
import HomeownerHomePageStackNavigation from './HomeownerHomePage/HomeownerHomePage'
import HomeownerAlertPageStackNavigation from './HomeownerAlertPage/HomeownerAlertPage'
import HomeownerSettingPageStackNavigation from './HomeownerSettingPage/HomeownerSettingPage'


export default HomeownerBottomTabNavigation = createBottomTabNavigator({
    HomeownerHomePageStackNavigation: {
        screen: HomeownerHomePageStackNavigation,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='view-grid'
                    type="material-community"
                    color='#F37021'/>
            ),
        },  
    },
    HomeownerAlertPageStackNavigation: {
        screen: HomeownerAlertPageStackNavigation,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='bell'
                    type="material-community"
                    color='#F37021'/>
            ),
        }, 
    },
    HomeownerSettingPageStackNavigation: {
        screen: HomeownerSettingPageStackNavigation,
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



