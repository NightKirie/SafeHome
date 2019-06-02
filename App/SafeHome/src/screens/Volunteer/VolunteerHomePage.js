import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


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
    // static navigationOptions = {
    //     headerLeft: null,
    //     headerTitle: (
    //         <Image
    //             resizeMode="contain"
    //             source={require('../../../assets/img/plaingrey-07.png')}
    //             style={{ height: 50, width: 50, flex: 1 }} />
    //     ),
    // }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerName}>
                    <Name style={styles.textName} name="楊承憲"></Name>
                </View>
                <View style={styles.containerWork}>
                    <View style={styles.firstRow}>
                        <TouchableOpacity style={styles.containerItem}
                            onPress={() => this.props.navigation.navigate('UnprogressedCase')}>
                            <Image
                                source={require('../../../assets/img/Case_Background.png')}
                                style={{ position: 'absolute', width: "100%", height: "100%",}}
                            />
                            <Image
                                source={require('../../../assets/img/numeric-1-circle.png')}
                                style={{ height: 30, width: 30 }}
                            />
                            <Text style={styles.txtItem}>待理案件</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerItem}>
                            <Image
                                source={require('../../../assets/img/numeric-2-circle.png')}
                                style={{ height: 30, width: 30 }}
                            />
                            <Text style={styles.txtItem}>已接案件</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.secondRow}>
                        <TouchableOpacity style={styles.containerItem}>
                            <Image
                                source={require('../../../assets/img/numeric-3-circle.png')}
                                style={{ height: 30, width: 30 }}
                            />
                            <Text style={styles.txtItem}>歷史案件</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        backgroundColor: "yellow",
    },
    containerName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "82",
        height: "10%",
        //marginHorizontal: "10%",
        marginTop: "10%",
        marginBottom: "5%",
        backgroundColor: "white"
    },
    containerWork: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: "#F2F1EF",
        width: "80%",
        marginBottom: "10%",
        backgroundColor: "red",
    },
    firstRow: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    secondRow: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: "row",
        backgroundColor: 'black',
    },
    containerItem: {
        width: 125,
        height: 125,
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
    },
    txtItem: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
    }
})
export default VolunteerHomePage;