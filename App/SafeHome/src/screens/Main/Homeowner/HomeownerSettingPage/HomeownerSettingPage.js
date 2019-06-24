import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { createStackNavigator } from 'react-navigation';


class HomeownerSettingPage extends Component {
    render() {
        return (
            <View style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <View style={styles.containerItem}>
                       <Image
                            source={require('../../../../../assets/img/不要瞎掰好嗎.png')}
                            style={{ flex: 3, width: "60%" }}
                        /> 
                        <View style={styles.containername}>
                            <Text style={{color: "#F37021", fontSize: 40}}>KID</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{color: "#BBBBBB", fontSize: 30}}>屋主</Text>
                        </View>
                    </View>
                    <View style={styles.containerbottonline}>
                        <TouchableOpacity style={styles.containerbotton}>
                            <Image
                            source={require('../../../../../assets/img/ICONS/Information.png')}
                            style={{ alignItems: 'center', justifyContent: 'center',flex: 1, width: "80%", margin:"5%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerbotton}>
                            <Image
                            source={require('../../../../../assets/img/ICONS/Warning.png')}
                            style={{ alignItems: 'center', justifyContent: 'center',flex: 1, width: "80%", margin:"5%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerbottonline}>
                    <TouchableOpacity style={styles.containerbotton}>
                            <Image
                            source={require('../../../../../assets/img/ICONS/Settings.png')}
                            style={{ alignItems: 'center', justifyContent: 'center',flex: 1, width: "80%", margin:"5%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerbotton}>
                            <Image
                            source={require('../../../../../assets/img/ICONS/Export.png')}
                            style={{ alignItems: 'center', justifyContent: 'center',flex: 1, width: "80%", margin:"5%" }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: "#F2F1EF"
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "80%",
        height: "80%",
        margin: "10%",
        marginBottom: "10%",
    },
    containername: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        width:"80%",
        borderColor: '#BBBBBB',
    },
    containertable: {
        margin: "5%",
        
        width: "90%",
        height: "75%",
    },
    containerinput: {
        borderWidth: 0.5,
        
        width: "100%",
        height: "19%"
    },



    containerItem: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height:"60%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    containerbottonline: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.5,
        marginTop: "5%",
        width: "100%",
    },
    containerbotton:{
        width: "48%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})


export default HomeownerSettingPage/*StackNavigation*/;
