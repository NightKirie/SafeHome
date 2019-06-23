import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import { Button, Input, } from 'react-native-elements';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "HouseOwner",   // 1 for householder(defualt), 2 for volunteer, 3 for technician
            buttonUser1BColor: "#F37021",
            buttonUser2BColor: "#FFFFFF",
            buttonUser3BColor: "#FFFFFF",
            buttonUser1Color: "#FFFFFF",
            buttonUser2Color: "#F37021",
            buttonUser3Color: "#F37021",
            userPhoneNum: "",
            userPassword: "",
            loginErrorMsg: "",
            registerPageOpacity: new Animated.Value(0),
            registerPageIsVisible: false,
        }   
    }

    setLoginErrorMsg = (loginErrorMsg) => {
        console.log(loginErrorMsg);
        this.setState({loginErrorMsg: loginErrorMsg});
    }

    render() {
        return (
            <View style={styles.containerOverlay}>
                <Text style={styles.textLogin}>登入</Text>
                <View style={styles.containerButtonUser}>
                    <Button
                        onPress={
                            () => {this.setState({
                                userType: "HouseOwner",
                                buttonUser1BColor: "#F37021",
                                buttonUser2BColor: "#FFFFFF",
                                buttonUser3BColor: "#FFFFFF",
                                buttonUser1Color: "#FFFFFF",
                                buttonUser2Color: "#F37021",
                                buttonUser3Color: "#F37021",});
                            this.setLoginErrorMsg("");
                        }}
                        title={"屋主"}
                        titleStyle={{ color: this.state.buttonUser1Color }}
                        icon={<Image
                            source={require('../../../assets/img/home-variant.png')}
                            style={{ tintColor: this.state.buttonUser1Color, height: 17, width: 17 }}
                        />}
                        buttonStyle={{ backgroundColor: this.state.buttonUser1BColor, paddingLeft: "5%" }}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }} />
                    <Button
                        onPress={() => {
                            this.setState({
                                userType: "Volunteer",
                                buttonUser1BColor: "#FFFFFF",
                                buttonUser2BColor: "#F37021",
                                buttonUser3BColor: "#FFFFFF",
                                buttonUser1Color: "#F37021",
                                buttonUser2Color: "#FFFFFF",
                                buttonUser3Color: "#F37021",
                            });
                            this.setLoginErrorMsg("");
                        }}
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
                        onPress={
                            () => {this.setState({
                                userType: "Engineer",
                                buttonUser1BColor: "#FFFFFF",
                                buttonUser2BColor: "#FFFFFF",
                                buttonUser3BColor: "#F37021",
                                buttonUser1Color: "#F37021",
                                buttonUser2Color: "#F37021",
                                buttonUser3Color: "#FFFFFF",
                            });
                            this.setLoginErrorMsg("");
                        }}
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
                            <Image
                                source={require('../../../assets/img/ICONS/Phone.png')}
                                style={{ tintColor: "#F37021", height: 17, width: 17 }}
                            />
                        }
                        value={this.state.userPhoneNum}
                        onChangeText={(userPhoneNum) => {
                            this.setState({ userPhoneNum: userPhoneNum.replace(/[^0-9]/g, '') });
                        }}
                        keyboardType='phone-pad'
                        inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                        containerStyle={{ paddingHorizontal: 18 }}
                        leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                    <Input
                        placeholder={"密碼"}
                        leftIcon={
                            <Image
                                source={require('../../../assets/img/ICONS/Lock.png')}
                                style={{ tintColor: "#F37021", height: 17, width: 17 }}
                            />
                        }
                        errorMessage={this.state.loginErrorMsg}
                        errorStyle={{ fontSize: 17 }}
                        value={this.state.userPassword}
                        onChangeText={(userPassword) => this.setState({ userPassword: userPassword })}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                        containerStyle={{ paddingHorizontal: 18 }}
                        leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                </View>
                <Button
                    title={"我大概沒用"}
                    onPress={() => this.props.testlogin()}
                    containerStyle={styles.containerstyleButtonForgetPW}
                    buttonStyle={{ backgroundColor: "#F2F1EF" }}
                    titleStyle={{ fontSize: 14, color: "#BBBBBB", fontWeight: "bold", textDecorationLine: "underline" }} />
                <Button
                    title={"登入"}
                    disabled={(this.state.userPhoneNum !== "" && this.state.userPassword !== "") ? false : true}
                    onPress={() => this.props.login(this.state.userType, this.state.userPhoneNum, this.state.userPassword)}
                    //onPress={() => this.props.testlogin()}
                    containerStyle={styles.containerstyleButtonLogin}
                    buttonStyle={{ backgroundColor: "#F37021" }}
                    titleStyle={{ fontWeight: "bold" }} />
                <Button
                    title={"註冊"}
                    disabled={this.state.userType === "HouseOwner" ? false : true}
                    onPress={() => this.props.register()}
                    containerStyle={[styles.containerstyleButtonRegister, this.state.userType === "HouseOwner" ? { opacity: 1 } : { opacity: 0 }]}
                    buttonStyle={{ backgroundColor: "#FFFFFF" }}
                    titleStyle={{ color: "#BBBBBB", fontWeight: "bold" }}
                />
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
    textLogin: {
        position: "relative",
        fontSize: 40,
        marginTop: "15%",
        color: "#BFBFBF"
    },
    containerButtonUser: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "82%",
        marginHorizontal: "8%",
        marginTop: "12%",
        padding: 0,
        margin: 0,
    },
    containerInput: {
        padding: "2%",
        paddingBottom: "5%",
        width: "82%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    containerstyleButtonForgetPW: {
        marginTop: "0.2%",
        paddingTop: 0,
        marginRight: "8%",
        marginLeft: "63.3%",
    },
    containerstyleButtonLogin: {
        width: "82%",
        marginTop: "18%",
        marginHorizontal: "8%",
    },
    containerstyleButtonRegister: {
        width: "82%",
        marginTop: "3%",
        marginHorizontal: "8%",
        borderWidth: 1,
        borderColor: "#BFBFBF",
        marginBottom: "5%",
    },
})

export default LoginPage;