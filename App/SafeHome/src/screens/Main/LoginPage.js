import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserType: 1,   // 1 for householder(defualt), 2 for volunteer, 3 for technician
            buttonUser1BColor: "#F37021",
            buttonUser2BColor: "#FFFFFF",
            buttonUser3BColor: "#FFFFFF",
            buttonUser1Color: "#FFFFFF",
            buttonUser2Color: "#F37021",
            buttonUser3Color: "#F37021",
            account: "",
            password: "",
        }
    }

    render() {
        return (
            <View style={styles.containerOverlay}>
                <Text style={styles.textLogin}>登入</Text>
                <View style={styles.containerButtonUser}>
                    <Button
                        onPress={() => this.setState({
                            loginUserType: 1,
                            buttonUser1BColor: "#F37021",
                            buttonUser2BColor: "#FFFFFF",
                            buttonUser3BColor: "#FFFFFF",
                            buttonUser1Color: "#FFFFFF",
                            buttonUser2Color: "#F37021",
                            buttonUser3Color: "#F37021",
                        })}
                        title={"屋主"}
                        titleStyle={{ color: this.state.buttonUser1Color }}
                        icon={<Image
                            source={require('../../../assets/img/home-variant.png')}
                            style={{ tintColor: this.state.buttonUser1Color, height: 17, width: 17 }}
                        />}
                        buttonStyle={{ backgroundColor: this.state.buttonUser1BColor, paddingLeft: "5%" }}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }} />
                    <Button
                        onPress={() => this.setState({
                            loginUserType: 2,
                            buttonUser1BColor: "#FFFFFF",
                            buttonUser2BColor: "#F37021",
                            buttonUser3BColor: "#FFFFFF",
                            buttonUser1Color: "#F37021",
                            buttonUser2Color: "#FFFFFF",
                            buttonUser3Color: "#F37021",
                        })}
                        title={"志工"}
                        titleStyle={{ color: this.state.buttonUser2Color }}
                        icon={<Image
                            source={require('../../../assets/img/baseline_assignment_white_48dp.png')}
                            style={{ tintColor: this.state.buttonUser2Color, height: 17, width: 17 }}
                        />}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }}
                        buttonStyle={{ backgroundColor: this.state.buttonUser2BColor }}
                    />
                    <Button
                        onPress={() => this.setState({
                            loginUserType: 3,
                            buttonUser1BColor: "#FFFFFF",
                            buttonUser2BColor: "#FFFFFF",
                            buttonUser3BColor: "#F37021",
                            buttonUser1Color: "#F37021",
                            buttonUser2Color: "#F37021",
                            buttonUser3Color: "#FFFFFF",
                        })}
                        title={"技師"}
                        titleStyle={{ color: this.state.buttonUser3Color }}
                        icon={<Image
                            source={require('../../../assets/img/progress-wrench.png')}
                            style={{ tintColor: this.state.buttonUser3Color, height: 17, width: 17 }}
                        />}
                        containerStyle={{ justifyContent: 'center', flex: 1 }}
                        buttonStyle={{ backgroundColor: this.state.buttonUser3BColor }}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Input
                        placeholder={"電話/手機號碼"}
                        leftIcon={
                            <Icon
                                name='call'
                                type='Foundation'
                                color='#F37021'
                                size={17}
                            />
                        }
                        onChangeText={(account) => this.account = account}
                        keyboardType='phone-pad'
                        inputStyle={styles.inputEmailPW}
                        containerStyle={{ paddingHorizontal: 18 }}
                        leftIconContainerStyle={styles.inputEmailPWIcon} />
                    <Input
                        placeholder={"密碼"}
                        leftIcon={
                            <Icon
                                name='lock'
                                type='Foundation'
                                color='#F37021'
                                size={17}
                            />
                        }
                        onChangeText={(password) => this.password = password}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        inputStyle={styles.inputEmailPW}
                        containerStyle={{ paddingHorizontal: 18 }}
                        leftIconContainerStyle={styles.inputEmailPWIcon} />
                </View>
                <Button
                    title={"忘記密碼 ？"}
                    containerStyle={styles.containerstyleButtonForgetPW}
                    buttonStyle={styles.butttonstyleButtonForgetPW}
                    titleStyle={{ fontSize: 14, color: "#BBBBBB", fontWeight: "bold", textDecorationLine: "underline" }} />
                <Button
                    onPress={() => this.props.login(this.state.loginUserType)}
                    title={"登入"}
                    containerStyle={styles.containerstyleButtonLogin}
                    buttonStyle={styles.buttonstyleButtonLogin}
                    titleStyle={{ fontWeight: "bold" }} />
                <Button
                    onPress={() => this.props.navigation.navigate('RegisterPage')}
                    title={"註冊"}
                    containerStyle={styles.containerstyleButtonRegister}
                    buttonStyle={styles.buttonstyleButtonRegister}
                    titleStyle={{ color: "#BBBBBB", fontWeight: "bold" }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerOverlay: {
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
    textLogin: {
        position: "relative",
        fontSize: 40,
        marginTop: "15%",
        marginLeft: "38%",
        color: "#BFBFBF"
    },
    containerButtonUser: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: "8%",
        marginTop: "12%",
        padding: 0,
        margin: 0,
        backgroundColor: "#F2F1EF",
    },
    buttonstyleButtonUser: {
        backgroundColor: "#F37021",
    },
    containerInput: {
        position: "relative",
        marginHorizontal: "8%",
        marginTop: 0,
        backgroundColor: "#FFFFFF",
        paddingBottom: "5%",
    },
    inputEmailPW: {
        paddingTop: 20,
        paddingLeft: 10,
    },
    inputEmailPWIcon: {
        marginLeft: 0,
        paddingTop: 10,
    },
    containerstyleButtonForgetPW: {
        marginTop: "0.2%",
        paddingTop: 0,
        marginRight: "8%",
        marginLeft: "63.3%",
    },
    butttonstyleButtonForgetPW: {
        backgroundColor: "#F2F1EF",
    },
    containerstyleButtonLogin: {
        marginTop: "18%",
        marginHorizontal: "8%",
    },
    containerstyleButtonRegister: {
        marginTop: "3%",
        marginHorizontal: "8%",
        borderWidth: 1,
        borderColor: "#BFBFBF",
        marginBottom: "5%"
    },
    buttonstyleButtonLogin: {
        backgroundColor: "#F37021",
    },
    buttonstyleButtonRegister: {
        backgroundColor: "#FFFFFF",
    }
})

export default LoginPage;