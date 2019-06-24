import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
} from "react-native";
import { createStackNavigator } from 'react-navigation';
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');



class VolunteerSettingPage extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
        }
        this.getVolunteerName();
    }

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

    getVolunteerName = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/home/getvolunteername/', { //發送HTTP post request提交表單
            credentials: 'include', //same-origin cookie
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
                console.log($('p').text());
                if(status === 'success') {     
                    this.setState({userName: $('p.success').text()});
                }
                else if (status === 'error') {
                    this.setState({userName: ""});
                }
            })     
    }

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <View style={styles.containerItem}>
                       <Image
                            source={require('../../../../../assets/img/撿到一百塊勒.png')}
                            style={{ flex: 3, width: "60%" }}
                        /> 
                        <View style={styles.containername}>
                            <Text style={{color: "#F37021", fontSize: 40}}>{this.state.userName}</Text>
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
                        <TouchableOpacity 
                            onPress={() => this.logout()}
                            style={styles.containerbotton}>
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
});

export default VolunteerSettingPageStackNavigation;
