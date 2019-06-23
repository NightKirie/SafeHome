import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Button,
} from "react-native";
import { createStackNavigator } from 'react-navigation';




class VolunteerSettingPage extends Component {
    logout = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/logout/', {
            credentials: 'include' //使用cookies
        })
            .then((response) => {
                //App依據伺服器回傳結果處理...
                console.log(response['url']);
                this.props.navigation.navigate('MainRegisterPageStackNavigation');
            })            
            .catch((err) => {
                alert(err.message);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>VolunteerSettingPage</Text>
                <Button title="logout" onPress={() => this.logout()}/>
            </View>
        );
    }
}

const VolunteerSettingPageStackNavigation = createStackNavigator({
    VolunteerSettingPage: {
        screen: VolunteerSettingPage,
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

export default VolunteerSettingPageStackNavigation;
