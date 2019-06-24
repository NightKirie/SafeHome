import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, ListView, Alert, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import call from 'react-native-phone-call';
var { height } = Dimensions.get('window');
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

class UnprogressedCasePage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            nothingText: "",
            caseSN: "",
            caseName: "",
            casebuildingType: "",
            caseAddress: "",
            casePhoneNum: "",
            caseDate: "",
            caseLat: 23.122841,
            caseLng: 120.464157,
            animation: new Animated.Value(0),
        }
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
        this.springAnimationXY = new Animated.ValueXY({ x: 0, y: height })
        this.getUnprogressedCase();
    };

    handleOpen = () => {
        console.log(this.state.caseLat);
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    handleClose = () => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    onLayout = (e) => {
        this.setState({
            overlayWidth: e.nativeEvent.layout.width,
            overlayHeight: e.nativeEvent.layout.height,
            overlayX: e.nativeEvent.layout.x,
            overlayY: e.nativeEvent.layout.y
        })
    }

    slideUpOverlay = () => {
        Animated.spring(
            this.springAnimationXY, {
                toValue: { x: 0, y: 0 },
            }
        ).start();
    }

    makeCall = () => {
        let number = this.state.casePhoneNum;
        if(number.charAt(0) === '0')
            number = number.substr(1);
        const args = {
            number: "+886" + number,
            prompt: false,
        };
        call(args).catch(console.error);
    }


    getUnprogressedCaseSpec = (sn) => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/check/', { //用以取得csrf_token
            //這邊沒有定義method: 'post'即是一般的HTTP requset，沒有提交表單，只有伺服器回應網頁。
            credentials: 'include', //使用cookies
            connection: 'keep-alive'
        })
            .then((response) => {
                return response.text(); //取得luffy.ee.ncku.edu.tw:13728/accounts/register/house/網頁的原始碼
            })
            .catch((err) => {
                Alert.alert("", err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                return $('input[name="csrfmiddlewaretoken"]').val(); //用jQuery語法取得csrf_token
            })
            .then((csrf) => {
                fetch('http://luffy.ee.ncku.edu.tw:13728/check/showdetail/', { //發送HTTP post request提交表單
                    method: 'post', //與先前fetch同樣的網址，但是多定義了method，即是發送Http post request提交表單
                    credentials: 'same-origin', //same-origin cookie
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' //設定資料類型，如同html
                    },
                    body: qs.stringify({ //用qs轉換成application/x-www-form-urlencoded格式，
                        csrfmiddlewaretoken: csrf, //csrf_token
                        sn: sn,
                    })
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
                        if (status === 'success') {
                            this.setState({ 
                                caseSN: $('li.sn').text(),
                                caseName: $('li.name').text(), 
                                casebuildingType: $('li.buildingType').text(),
                                caseAddress: $('li.address').text(),
                                casePhoneNum: $('li.phone').text(),
                                caseDate: $('li.applyDate').text(),
                                caseLat: parseFloat($('li.lat').text()),
                                caseLng: parseFloat($('li.lng').text()),
                            }, ()=>this.handleOpen());
                        }
                        else if (status === 'error') {
                            this.setState({ 
                                caseSN: "",
                                caseName: "案件資料錯誤", 
                                casebuildingType: "",
                                caseAddress: "",
                                casePhoneNum: "",
                                caseDate: "",
                                caseLat: 23.122841,
                                caseLng: 120.464157,
                            });
                        }
                        return "done";
                    })
            })
    }

    getUnprogressedCase = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/check/showunassignedcases/', { //發送HTTP post request提交表單
            credentials: 'include', //same-origin cookie
        })
            .then((response) => {
                return response.text(); //取得網頁的原始碼
            })
            .catch((err) => {
                this.setState({ nothingText: "沒有可接案件" });
                Alert.alert("", err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                let status = $('p').attr("class"); // Get class is success or error
                if (status === 'success') {
                    this.setState({ nothingText: "" });
                    let dataList = [];
                    $('ul.case').each(function (index, item) {
                        dataList.push({
                            sn: $(item).find('li.sn').text(),
                            name: $(item).find('li.name').text(),
                            date: $(item).find('li.date').text()
                        });
                    });
                    this.setState({ dataList: dataList });
                    console.log('yes');
                }
                else if (status === 'error') {
                    this.setState({ 
                        nothingText: "沒有可接案件",
                        dataList: []
                    });
                    console.log('no');
                }
            })    
    }
    
    acceptUnprogressedCase = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/check/', { //用以取得csrf_token
            //這邊沒有定義method: 'post'即是一般的HTTP requset，沒有提交表單，只有伺服器回應網頁。
            credentials: 'include', //使用cookies
            connection: 'keep-alive'
        })
            .then((response) => {
                return response.text(); //取得luffy.ee.ncku.edu.tw:13728/accounts/register/house/網頁的原始碼
            })
            .catch((err) => {
                Alert.alert("", err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                return $('input[name="csrfmiddlewaretoken"]').val(); //用jQuery語法取得csrf_token
            })
            .then((csrf) => {
                fetch('http://luffy.ee.ncku.edu.tw:13728/check/assign/', { //發送HTTP post request提交表單
                    method: 'post', //與先前fetch同樣的網址，但是多定義了method，即是發送Http post request提交表單
                    credentials: 'same-origin', //same-origin cookie
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' //設定資料類型，如同html
                    },
                    body: qs.stringify({ //用qs轉換成application/x-www-form-urlencoded格式，
                        csrfmiddlewaretoken: csrf, //csrf_token
                        sn: this.state.caseSN,
                    })
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
                        if (status === 'success') {
                            Alert.alert("", '接案成功！');
                        }
                        else if (status === 'error') {
                            let status_err = $('p').attr("id");
                            if(status_err === "byOthers") 
                                Alert.alert("", '錯誤，其他志工已接案');
                            else if(status_err === "notFound")
                                Alert.alert("", '案件不存在');
                        }
                        return "done";
                    })
                    .then((done) => {
                        if(done === "done")
                            this.getUnprogressedCase();
                        return "done"
                    })
                    .then((done) => {
                        if(done === "done")
                            this.handleClose();
                    })
            })
    }

    render() {
        const screenHeight = Dimensions.get("window").height;
        const backdrop = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 0.01],
                        outputRange: [screenHeight, 0],
                        extrapolate: "clamp",
                    }),
                },
            ],
            opacity: this.state.animation.interpolate({
                inputRange: [0.01, 0.5],
                outputRange: [0, 1],
                extrapolate: "clamp",
            }),
        };
        const slideUp = {
            transform: [
                {
                    scale: this.state.animation.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0.8, 1],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };


        return (
            <View style={styles.container}>
                <View style={styles.caseContainer}>
                    {(this.state.nothingText === "") ? null : (<Text style={{ fontSize: 40, textAlign: 'center', color: "#BBBBBB" }}>{this.state.nothingText}</Text>)}
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(this.state.dataList)}
                        renderRow={(rowData) =>
                            <TouchableOpacity 
                                style={styles.caseItemContainer}
                                onPress={()=>this.getUnprogressedCaseSpec(rowData.sn)}>
                                <View>
                                    <Text style={{ fontSize: 40, color: "#BBBBBB" }}>{rowData.name}</Text>
                                </View>
                                <View >
                                    <Text style={{ fontSize: 22, textAlign: "right", color: "#BBBBBB" }}>申請日期</Text>
                                    <Text style={{ fontSize: 20, textAlign: "right", color: "#BBBBBB" }}>{rowData.date}</Text>
                                </View>
                            </TouchableOpacity>}
                    />
                </View>
                <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
                    <View style={[styles.sheet]}>
                        <Animated.View style={[styles.popup, slideUp]}>
                            <View style={styles.userDataContainer}>
                                <View style={{ flex: 1, backgroundColor: "#BBBBBB" }}>
                                <MapView
                                    provider={ PROVIDER_GOOGLE } 
                                    region={{
                                        latitude: this.state.caseLat,
                                        longitude: this.state.caseLng,
                                        latitudeDelta: 0.0005,
                                        longitudeDelta: 0.0001,
                                    }}
                                    style={styles.map}
                                />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={{ flex: 2.3, }}>
                                        <View style={{ flex: 1.5, justifyContent: "flex-end" }}>
                                            <Text style={styles.caseUserName}>{this.state.caseName}</Text>
                                            <Text style={styles.caseUserBuildingType}>{this.state.casebuildingType}</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <Text style={styles.caseUserAddress}>{this.state.caseAddress}</Text>
                                            <Text style={styles.caseUserTel}>{this.state.casePhoneNum}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1.5, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: 17, color: "#BBBBBB", marginRight: "15%" }}>申請日期</Text>
                                            <Text style={styles.caseUserDate}>{this.state.caseDate}</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                                            <Button
                                                onPress={()=>this.makeCall()}
                                                title={"致電"}
                                                titleStyle={{ color: "#F37021", fontSize: 22 }}
                                                buttonStyle={{ backgroundColor: "rgba(0, 0, 0, 0)", borderColor: "#F37021", borderWidth: 2, height: "80%", borderRadius: 8 }}
                                                containerStyle={{ marginRight: "10%", marginTop: "15%" }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horizontalButtonContainer}>
                                <Button
                                    onPress={() => this.acceptUnprogressedCase()}
                                    title={"接案"}
                                    titleStyle={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}
                                    buttonStyle={{ backgroundColor: "#F37021", paddingLeft: "5%" }}
                                    containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }} />
                                <Button
                                    onPress={this.handleClose}
                                    title={"關閉"}
                                    titleStyle={{ color: "#BBBBBB", fontSize: 20, fontWeight: "bold" }}
                                    buttonStyle={{ backgroundColor: "#FFFFFF", paddingLeft: "5%" }}
                                    containerStyle={{ justifyContent: 'center', flex: 1, marginLeft: "2%" }} />
                            </View>

                        </Animated.View>
                    </View>
                </Animated.View>
                <Animated.View style={[this.springAnimationXY.getLayout(), { position: "absolute", height: "100%", width: "100%", justifyContent: 'flex-end', }]}>
                    <View style={styles.overlay} onLayout={this.onLayout}>
                        <Image
                            source={require('../../../../../assets/img/Yes.png')}
                            style={{ height: 50, width: 50, tintColor: "#F37021" }}
                        />
                        <Text style={{ color: "#BBBBBB", fontSize: 40 }}>接案成功</Text>
                    </View>
                </Animated.View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        backgroundColor: "#F2F1EF",
    },
    caseContainer: {
        marginTop: "5%",
        position: "relative",
        width: "90%",
    },
    caseItemContainer: {
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingHorizontal: "5%",
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: "white",
    },
    overlay: {
        position: "relative",
        alignItems: "center",
        left: "15%",
        width: "70%",
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 2,
        paddingTop: "10%",
        paddingBottom: "10%",
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
    },
    sheet: {
        position: "absolute",
        top: "15%",
        left: 0,
        right: 0,
        height: "70%",
        justifyContent: "flex-start",
    },
    popup: {
        marginHorizontal: "7%",
        justifyContent: 'space-between',
        height: "100%",
    },
    userDataContainer: {
        backgroundColor: "white",
        height: "85%",
    },
    horizontalButtonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "100%",
        bottom: "0%",
    },
    caseButton: {
        height: "100%",
        width: "50%",
    },
    caseUserName: {
        fontSize: 38,
        fontWeight: "bold",
        color: "#707070",
        marginLeft: "5%",
    },
    caseUserBuildingType: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#BBBBBB",
        marginLeft: "5%",
        marginBottom: "5%",
    },
    caseUserDate: {
        fontSize: 17,
        color: "#BBBBBB",
        marginBottom: "10%",
        marginRight: "15%"
    },
    caseUserAddress: {
        fontSize: 17,
        color: "#BBBBBB",
        marginTop: "5%",
        marginLeft: "5%",
    },
    caseUserTel: {
        fontSize: 17,
        color: "#BBBBBB",
        marginLeft: "5%",
    },
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})

export default UnprogressedCasePage;