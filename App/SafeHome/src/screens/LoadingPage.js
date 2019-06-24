import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, Image, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { fromRight } from 'react-navigation-transitions';
import LoginPage from './Main/LoginPage';
import RegisterPage from './Main/RegisterPage';
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

class LoadingPage extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            isAnimationFinish: false,
            isOverlayVisible: true,
            backgroundColorContainer: "#FFFFFF",
            signedIn: false,
            animationComponent: null,
            loginErrorMsg: "",
        }
        this.springAnimationXY = new Animated.ValueXY({ x: 0, y: 1000 })
        this.loginRef = React.createRef();
    }

    cheakIfLoginBefore = () => {
        /* 直接嘗試登入伺服器，如果回傳success表示登入過 */
        fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/login/', { //用以取得csrf_token
            //這邊沒有定義method: 'post'即是一般的HTTP requset，沒有提交表單，只有伺服器回應網頁。
            credentials: 'include', //使用cookies
            connection: 'keep-alive'
        })      
            .then((response) => {
                return response.text(); //取得網頁的原始碼
            })
            .catch((err) => {
                Alert.alert("", err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                let status = $('p').attr("class"); // Get class is success or error
                let status_msg = $('p').attr("id"); // Get id of error type
                let ifLogin = $(`p.${status}#${status_msg}`).text();
                console.log(ifLogin);
                switch(ifLogin) {
                    /* For homewowner */
                    case "HouseOwner":
                        Alert.alert("", "屋主登入成功！");
                        Alert.alert("Homeowner page is build in progress");
                        break;
                    /* For volunteer */
                    case "Volunteer":
                        /* If login type match */
                        Alert.alert("", "志工登入成功！");
                        this.props.navigation.navigate('VolunteerBottomTabNavigation');
                        break;
                    /* For technician */
                    case "Engineer":
                        Alert.alert("", "技師登入成功！");
                        Alert.alert("", "Engineer page is build in progress"); 
                        break;
                    default:
                        this.didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
                            this.loginRef.current.setLoginErrorMsg("");
                        });
                        this.setState({
                            animationComponent: <LoginPage 
                                                    ref={this.loginRef}
                                                    login={(userType, userPhoneNum, userPassword)=>this.login(userType, userPhoneNum, userPassword)}
                                                    register={() => this.props.navigation.navigate('RegisterPage')}
                                                    testlogin={()=>this.props.navigation.navigate('VolunteerBottomTabNavigation')}
                                                    testlogout={()=>this.logout()}/>});
                        
                }
            });
    }

    /* For slide down the SafeHome icon */
    slideDown = () => {
        if(this.state.isAnimationFinish === false) {
            this.setState({isAnimationFinish: true});
            this.cheakIfLoginBefore();
            Animated.spring(
                this.springAnimationXY, {
                    toValue: { x: 0, y: 0 },
                }
            ).start();
            this.setState({ backgroundColorContainer: "grey" });
            if (this.interval)  // Remove the timer
                clearInterval(this.interval);
        }
    }

    /* If user doesn't click SafeHome icon after 3 seconds, automatically slide down it */
    setTimerlideDown = () => {
        this.interval = setInterval(this.slideDown, 1500);
    }
  
    login(userType, userPhoneNum, userPassword) {
        fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/login/', { //用以取得csrf_token
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
                fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/login/submit/', { //發送HTTP post request提交表單
                    method: 'post', //與先前fetch同樣的網址，但是多定義了method，即是發送Http post request提交表單
                    credentials: 'same-origin', //same-origin cookie
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' //設定資料類型，如同html
                    },
                    body: qs.stringify({ //用qs轉換成application/x-www-form-urlencoded格式，
                        csrfmiddlewaretoken: csrf, //csrf_token
                        userType: userType,
                        username: userPhoneNum, //屋主註冊的form input
                        password: userPassword,              
                    })
                })
                    .then((response) => {
                        return response.text(); //取得網頁的原始碼
                    })
                    .then((text) => {
                        return htmlparser2.parseDOM(text); //轉換成html
                    })
                    .then((dom) => {
                        let $ = cheerio.load(dom); //constructor
                        let status = $('p').attr("class"); // Get class is success or error
                        let status_msg = $('p').attr("id"); // Get id of error type
                        if(status === 'success') {
                            /* Need to check if login type is same as return type */
                            let loginType = $(`p.${status}#${status_msg}`).text();
                            switch (loginType) {
                                /* For homewowner */
                                case "HouseOwner":
                                    Alert.alert("", "屋主登入成功！");
                                    Alert.alert("Homeowner page is build in progress");
                                    break;
                                /* For volunteer */
                                case "Volunteer":
                                    /* If login type match */
                                    Alert.alert("", "志工登入成功！");
                                    this.props.navigation.navigate('VolunteerBottomTabNavigation');
                                    break;
                                /* For technician */
                                case "Engineer":
                                    Alert.alert("", "技師登入成功！");
                                    Alert.alert("", "Engineer page is build in progress"); 
                                    break;
                                default:
                                    Alert.alert("", "Type not found");
                            }
                        }
                        else if(status === 'error') {
                            switch(status_msg) {
                                case "nullInput":
                                    Alert.alert("", "帳號或密碼不能為空");
                                    break;
                                case "inactiveUser":
                                    Alert.alert("", "使用者帳號無效，請連繫客服");
                                    break;
                                case "non-existUser":
                                    Alert.alert("", "帳號或密碼錯誤");
                                    break;
                            }
                        }  
                        return status;
                    })
            })
    }
    
    logout = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/logout/', {
            credentials: 'include' //使用cookies
        })
            .then((response) => {
                //App依據伺服器回傳結果處理...
                console.log(response['url']);
            })
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, { backgroundColor: this.state.backgroundColorContainer }]}
                onPress={this.slideDown}
                onLayout={this.setTimerlideDown}
                activeOpacity={1}>
                <View style={{ position: "absolute" }}>
                    <Image
                        source={require('../../assets/img/plainorange-07.png')}
                        style={{ height: 100, width: 100 }}
                    />
                </View>
                <Animated.View style={[styles.container, this.springAnimationXY.getLayout()]}>
                    { this.state.animationComponent }     
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const MainRegisterPageStackNavigation = createStackNavigator({
    LoadingPage: {
        screen: LoadingPage,
    },
    RegisterPage: {
        screen: RegisterPage,
    },
},{
    initialRouteName: 'LoadingPage',
    transitionConfig: () => fromRight()
});

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
})

export default MainRegisterPageStackNavigation;