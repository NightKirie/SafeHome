import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input, } from 'react-native-elements';

class RegisterPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userPhoneNum: "",
            userPassword: "",
            userPasswordNotMatch: " ",
        }
    }

    clickRegisterButton = () => {
        alert(`${this.state.userName}`);
        alert(`${this.state.userPhoneNum}`);
        alert(`${this.state.userPassword}`);

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerOverlay}>
                    <Text style={styles.textRegister}>註冊</Text>
                    <View style={styles.containerInput}>
                        <Input
                            placeholder={"姓名"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Profile.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            }
                            value={this.state.userName}
                            onChangeText={(userName) => {this.setState({userName: userName})}}
                            keyboardType='default'
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
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
                                this.setState({userPhoneNum : userPhoneNum.replace(/[^0-9]/g, '')});}}
                            keyboardType='phone-pad'
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                        <Input
                            placeholder={"填寫密碼"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Lock.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            }
                            value={this.state.userPassword}
                            onChangeText={(userPassword) => {this.setState({userPassword: userPassword})}}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                        <Input
                            placeholder={"再次確認密碼"}
                            leftIcon={
                                <Image
                                    source={require('../../../assets/img/ICONS/Lock.png')}
                                    style={{ tintColor: "#F37021", height: 17, width: 17 }}
                                />
                            }
                            errorMessage={this.state.userPasswordNotMatch}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.userPassword}
                            onChangeText={(userPassword) => {
                                if(userPassword != this.state.userPassword)
                                    this.setState({userPasswordNotMatch: "密碼不一致"})
                                else
                                    this.setState({userPasswordNotMatch: " "})
                            }} 
                            secureTextEntry={true}
                            autoCapitalize='none'
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                    </View>
                    <Button
                        title={"提交"}
                        onPress={() => this.clickRegisterButton() }
                        containerStyle={styles.containerstyleButtonSubmit}
                        buttonStyle={{ backgroundColor: "#F37021" }}
                        titleStyle={{ fontWeight: "bold" }} />
                    <Button
                        title={"取消"}
                        onPress={() => this.props.navigation.navigate('LoadingPage')}
                        containerStyle={styles.containerstyleButtonCancel}
                        buttonStyle={{ backgroundColor: "white", }}
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
        marginBottom: "5%",
        color: "#BFBFBF",
    },
    containerInput: {
        padding: "2%",
        paddingBottom: "4%",
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
})
export default RegisterPage;