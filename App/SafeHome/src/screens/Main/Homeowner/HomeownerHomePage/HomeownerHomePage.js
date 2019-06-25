import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import ApplyCasePage_1 from './ApplyCasePage_1';
import ApplyCasePage_2 from './ApplyCasePage_2';
import RecordPage from './RecordPage';
import qs from 'qs';
const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');


class Name extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
        this.getHomeownerName();
    }
    getHomeownerName = () => {
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
            <View>
                <Text style={{ color: "#F37021", fontSize: 50 }}>
                    {this.state.userName } <Text style={{ color: "#BBBBBB", fontSize: 30 }}>您好</Text>
                </Text>
            </View>
        );
    }
}

class HomeownerHomePage extends Component {
  render() {
    return (
		<View style={styles.backgroundContainer}>
			<View style={styles.container}>
				<View style={{ flex: 1, width: "100%" }}>
                        <View style={styles.containerName}>
                            <Image
                                source={require('../../../../../assets/img/Name_Background.png')}
                                style={{ position: 'absolute', width: "100%", height: "100%", }}
                            />
							<Name style={styles.textName} name="XXX"></Name>
                        </View>
                </View>
				<View style={{ flex: 1, width: "100%" }}>
					<View style={styles.containerWork}>
						<TouchableOpacity style={styles.containerItem}
                            onPress={() => this.props.navigation.navigate('ApplyCasePage_1')}>
                            <Image
                                source={require('../../../../../assets/img/ApplyCase_Background.png')}
                                style={{ position: 'absolute', width: "100%", height: "100%",}}
                            />
                            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>申請勘查</Text>
                    	</TouchableOpacity>
						<TouchableOpacity style={styles.containerItem}
                            onPress={() => this.props.navigation.navigate('ApplyCasePage')}>
                            <Text style={{ color: "#BBBBBB", fontSize: 25, fontWeight: "bold" }}>案件紀錄</Text>
                    	</TouchableOpacity>
                	</View>
                </View>
      		</View>
		</View>
      
    );
  }
}
const HomeownerHomePageStackNavigation = createStackNavigator({
    HomeownerHomePage: {
        screen: HomeownerHomePage,
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
    ApplyCasePage_1: {
        screen: ApplyCasePage_1,
        navigationOptions: {
            headerTitle: "申請勘查",
            headerTitleStyle: { flex: 2, textAlign: "center", },
            headerTintColor: "#F37021"
        }
    },
    ApplyCasePage_2: {
        screen: ApplyCasePage_2,
        navigationOptions: {
            headerTitle: "申請勘查",
            headerTitleStyle: { flex: 2, textAlign: "center", },
            headerTintColor: "#F37021"
        }
    },

    RecordPage: {
        screen: RecordPage,
        navigationOptions: {
            headerTitle: "申請紀錄",
            headerTitleStyle: { flex: 2, textAlign: "center", },
            headerTintColor: "#F37021",
        }
    }
},{
    initialRouteName: 'HomeownerHomePage',
    transitionConfig: () => fromRight()
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
		height: "70%",
		marginBottom: "30%"
    },
    containerName: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "90%",
        backgroundColor: "white"
    },
    containerWork: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#F2F1EF",
        width: "100%",
    },

    containerItem: {
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
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1
    }
})
export default HomeownerHomePageStackNavigation;