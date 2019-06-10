import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input, } from 'react-native-elements';


class RegisterPage extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerOverlay}>
                    <Text style={styles.textRegister}>註冊</Text>
                    <View style={styles.whitecontainer}>
                        <Input
                            placeholder={"姓名"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Profile.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            } />
                        <Input
                            placeholder={"電子郵件"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Messages.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            } />
                        <Input
                            placeholder={"填寫密碼"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Lock.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            } />
                        <Input
                            placeholder={"確認密碼"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Lock.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            } />
                    </View>
                    <Button
                        title={"提交"}
                        containerStyle={styles.containerstyleButtonSubmit}
                        buttonStyle={styles.buttonstyleButtonSubmit}
                        titleStyle={{ fontWeight: "bold" }} />
                    <Button
                        title={"取消"}
                        onPress={() => this.props.navigation.navigate('LoadingPage') }
                        containerStyle={styles.containerstyleButtonCancel}
                        buttonStyle={styles.buttonstyleButtonCancel}
                        titleStyle={{ color: "#BBBBBB", fontWeight: "bold" }} />
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
        backgroundColor: "grey",
        zIndex: 0,
    },
    containerOverlay: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        width: "90%",
        height: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#F2F1EF",
        zIndex: 2,
    },
    textRegister: {
        position: "relative",
        fontSize: 40,
        marginTop: "15%",
        marginBottom: "12%",
        color: "#BFBFBF"
    },
    whitecontainer: {
        padding: "2%",
        paddingBottom: "4%",
        // marginTop:"20%",
        width: "82%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    containerstyleButtonSubmit: {
        width: "82%",
        marginTop: "6%",
        marginHorizontal: "8%",
    },
    containerstyleButtonCancel: {
        width: "82%",
        marginTop: "3%",
        marginHorizontal: "8%",
        borderWidth: 1,
        borderColor: "#BFBFBF",
        marginBottom: "5%"
    },
    buttonstyleButtonSubmit: {
        backgroundColor: "#F37021",
    },
    buttonstyleButtonCancel: {
        backgroundColor: "white",
    }
})
export default RegisterPage;