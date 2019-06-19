import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import { createStackNavigator } from 'react-navigation';


class HomeownerSettingPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HomeownerSettingPage</Text>
            </View>
        );
    }
}

const HomeownerSettingPageStackNavigation = createStackNavigator({
    HomeownerSettingPage: {
        screen: HomeownerSettingPage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: (
                <Image
                    resizeMode="contain"
                    source={require('../../../../../assets/img/plaingrey-07.png')}
                    style={{ height: 50, width: 50, flex: 1 }} />
            ),
        },
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeownerSettingPageStackNavigation;
