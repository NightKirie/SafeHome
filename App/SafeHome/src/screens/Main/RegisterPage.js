import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input, } from 'react-native-elements';
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

class RegisterPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userNameErrorMsg: "",
            userPhoneNum: "",
            userPhoneNumErrorMsg: "",
            userPassword: "",
            userPasswordErrorMsg: "",
            userPasswordRecheck: "",
            userPasswordRecheckErrorMsg: " ",
        }
    }

    setRegisterErrorMsg = () => {
        alert("註冊失敗，請重新輸入");
    }


    clickRegisterButton = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/register/', { //用以取得csrf_token
            //這邊沒有定義method: 'post'即是一般的HTTP requset，沒有提交表單，只有伺服器回應網頁。
            credentials: 'include', //使用cookies
            connection: 'keep-alive'
        })
            .then((response) => {
                return response.text(); //取得網頁的原始碼
            })
            .catch((err) => {
                this.loginRef.current.setLoginErrorMsg(err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                return $('input[name="csrfmiddlewaretoken"]').val(); //用jQuery語法取得csrf_token
            })
            .then((csrf) => {
                fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/register/', { //發送HTTP post request提交表單
                    method: 'post', //與先前fetch同樣的網址，但是多定義了method，即是發送Http post request提交表單
                    credentials: 'same-origin', //same-origin cookie
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' //設定資料類型，如同html
                    },
                    body: qs.stringify({ //用qs轉換成application/x-www-form-urlencoded格式，
                        csrfmiddlewaretoken: csrf, //csrf_token
                        username: this.state.userPhoneNum,
                        firstName: this.state.userName,
                        lastName: this.state.userName,
                        password: this.state.userPassword,
                    })
                })
                    .then((response) => {
                        return response.text(); //取得網頁的原始碼
                    })
                    .then((text) => {
                        return htmlparser2.parseDOM(text); //轉換成html
                    })
                    .then((dom) => {
                        // let $ = cheerio.load(dom); //constructor
                        // let status = $('p').attr("class"); // Get class is success or error
                        // let status_msg = $('p').attr("id"); // Get id of error type
                        // if(status === 'success') {
                        //     /* Need to check if login type is same as return type */

                        // }
                        // else if(status === 'error') {
                        //     switch(status_msg) {
                        //         case "nullInput":
                        //             this.loginRef.current.setLoginErrorMsg("帳號或密碼不能為空");
                        //             break;
                        //         case "inactiveUser":
                        //             this.loginRef.current.setLoginErrorMsg("使用者帳號無效");
                        //             break;
                        //         case "non-existUser":
                        //             this.loginRef.current.setLoginErrorMsg("帳號或密碼錯誤");
                        //             break;
                        //     }
                        // }  
                        // return status;
                    })
            })
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
                            errorMessage={this.state.userNameErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.userName}
                            onChangeText={(userName) => {
                                this.setState({userName: userName});
                                if(userName === "")
                                    this.setState({userNameErrorMsg: "姓名不能為空"});
                                else
                                    this.setState({userNameErrorMsg: ""});
                            }}
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
                            errorMessage={this.state.userPhoneNumErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.userPhoneNum}
                            onChangeText={(userPhoneNum) => {
                                this.setState({userPhoneNum : userPhoneNum.replace(/[^0-9]/g, '')});
                                if(userPhoneNum === "")
                                    this.setState({userPhoneNumErrorMsg: "電話不能為空"});
                                else
                                    this.setState({userPhoneNumErrorMsg: ""});
                            }}
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
                            errorMessage={this.state.userPasswordErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.userPassword}
                            onChangeText={(userPassword) => {
                                this.setState({userPassword: userPassword});
                                if(userPassword === "")
                                    this.setState({userPasswordErrorMsg: "密碼不能為空"});
                                else
                                    this.setState({userPasswordErrorMsg: ""});
                                if(this.state.userPasswordRecheck != userPassword)
                                    this.setState({userPasswordRecheckErrorMsg: "密碼不一致"})
                                else
                                    this.setState({userPasswordRecheckErrorMsg: " "})
                            }}
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
                            errorMessage={this.state.userPasswordRecheckErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.userPasswordRecheck}
                            onChangeText={(userPasswordRecheck) => {
                                this.setState({userPasswordRecheck: userPasswordRecheck});
                                if(userPasswordRecheck != this.state.userPassword)
                                    this.setState({userPasswordRecheckErrorMsg: "密碼不一致"})
                                else
                                    this.setState({userPasswordRecheckErrorMsg: " "})
                            }} 
                            secureTextEntry={true}
                            autoCapitalize='none'
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                    </View>
                    <Button
                        title={"提交"}
                        disabled={ 
                            (this.state.userPhoneNum !== "" &&
                                this.state.userName !== "" &&
                                this.state.userPassword !== "" &&
                                this.state.userPasswordRecheck !== "" && 
                                this.state.userPassword === this.state.userPasswordRecheck) ? false : true}
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