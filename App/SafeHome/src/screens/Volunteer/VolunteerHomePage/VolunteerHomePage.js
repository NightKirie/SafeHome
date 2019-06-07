import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import UnprogressedCasePage from './UnprogressedCasePage';
import ProgressingCasePage from './ProgressingCasePage';
import HistoryCasePage from './HistoryCasePage';

class Name extends Component {  
    render() {
        return (
            <View>
                <Text style={{ color: "#F37021", fontSize: 50 }}>
                    {this.props.name} <Text style={{ color: "#BBBBBB", fontSize: 30 }}>您好</Text>
                </Text>
            </View>
        );
    }
}
class VolunteerHomePage extends Component {
    render() {
        return (
            <View style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <View style={{ flex: 1, width: "100%" }}>
                        <View style={styles.containerName}>
                            <Name style={styles.textName} name="楊承憲"></Name>
                        </View>
                    </View>
                    <View style={{ flex: 2, width: "100%" }}>
                        <View style={styles.containerWork}>
                            <View style={styles.firstRow}>
                                <TouchableOpacity style={styles.containerItem}
                                    onPress={() => this.props.navigation.navigate('UnprogressedCasePage')}>
                                    <Image
                                        source={require('../../../../assets/img/Case_Background.png')}
                                        style={{ position: 'absolute', width: "100%", height: "100%",}}
                                    />
                                    <Image
                                        source={require('../../../../assets/img/numeric-1-circle.png')}
                                        style={{ height: 30, width: 30 }}
                                    />
                                    <Text style={styles.txtItem}>待理案件</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.containerItem}
                                    onPress={() => this.props.navigation.navigate('ProgressingCasePage')}>
                                    <Image
                                        source={require('../../../../assets/img/AcceptCase_Background.png')}
                                        style={{ position: 'absolute', width: "100%", height: "100%",}}
                                    />
                                    <Image
                                        source={require('../../../../assets/img/numeric-2-circle.png')}
                                        style={{ height: 30, width: 30 }}
                                    />
                                    <Text style={styles.txtItem}>已接案件</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.secondRow}>
                                <TouchableOpacity style={styles.containerItem}
                                    onPress={() => this.props.navigation.navigate('HistoryCasePage')}>
                                    <Image
                                        source={require('../../../../assets/img/History_Background.png')}
                                        style={{ position: 'absolute', width: "100%", height: "100%",}}
                                    />
                                    <Image
                                        source={require('../../../../assets/img/numeric-3-circle.png')}
                                        style={{ height: 30, width: 30 }}
                                    />
                                    <Text style={styles.txtItem}>歷史案件</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const VolunteerHomePageStackNavigation = createStackNavigator({
    VolunteerHomePage: {
        screen: VolunteerHomePage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: (
                <Image
                    resizeMode="contain"
                    source={require('../../../../assets/img/plaingrey-07.png')}
                    style={{ height: 50, width: 50, flex: 1 }} />
            ),
        },
    },
    UnprogressedCasePage: {
        screen: UnprogressedCasePage,
        navigationOptions: {
            headerTitle: "待理案件",
            headerTitleStyle: { flex: 2, textAlign: "center", },
            headerTintColor: "#F37021",
            headerRight: (<Image
                source={require('../../../../assets/img/help-circle.png')}
                style={{ height: 25, width: 25, tintColor: "#F37021", margin: 3 }}
            />)
        }
    },
    ProgressingCasePage: {
        screen: ProgressingCasePage,
        navigationOptions: {
            headerTitle: "已接案件",
            headerTitleStyle: { flex: 2, textAlign: "center", },
            headerTintColor: "#F37021",
            headerRight: (<Image
                source={require('../../../../assets/img/help-circle.png')}
                style={{ height: 25, width: 25, tintColor: "#F37021", margin: 3 }}
            />)
        }
    },
    HistoryCasePage: {
        screen: HistoryCasePage,
        navigationOptions: {
            headerTitle: "歷史案件",
            headerTitleStyle: { flex: 2, textAlign: "center", },
            headerTintColor: "#F37021",
            headerRight: (<Image
                source={require('../../../../assets/img/help-circle.png')}
                style={{ height: 25, width: 25, tintColor: "#F37021", margin: 3 }}
            />)
        }
    }
});

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
        width: "80%",
        height: "90%",
    },
    containerName: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "90%",
        backgroundColor: "white"
    },
    containerWork: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: "#F2F1EF",
        width: "100%",
    },
    firstRow: {
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    secondRow: {
        paddingTop: '4%',
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    containerItem: {
        width: "48%",
        backgroundColor: "#F37021",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1
    },
    txtItem: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    }
})

export default VolunteerHomePageStackNavigation;