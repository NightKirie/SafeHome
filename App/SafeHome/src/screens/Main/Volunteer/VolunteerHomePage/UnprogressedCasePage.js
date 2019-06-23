import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, ListView, Alert } from 'react-native';
import { Dimensions } from 'react-native';
const data = require('../../../../../assets/json/progressedcases.json');
var { height } = Dimensions.get('window');
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

class UnprogressedCasePage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            nothingText: ""
        }
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
        this.springAnimationXY = new Animated.ValueXY({ x: 0, y: height })
        this.getUnprogressedCase();
    };
    
    //componentDidMount

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

    getUnprogressedCase = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/check/showunassignedcases/', { //發送HTTP post request提交表單
            credentials: 'include', //same-origin cookie
        })
            .then((response) => {
                return response.text(); //取得網頁的原始碼
            })
            .catch((err) => {
                this.setState({nothingText: "沒有可接案件"});
                Alert.alert("", err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                let status = $('p').attr("class"); // Get class is success or error
                if(status === 'success') {     
                    this.setState({nothingText: ""});
                    let dataList = [];
                    $('ul.case').each(function(index, item) {
                        //let case = {};
                        dataList.push({
                            sn: $(item).find('li.sn').text(),
                            name: $(item).find('li.name').text(),
                            date: $(item).find('li.date').text()
                        });
                    });
                    this.setState({dataList: dataList});
                }
                else if (status === 'error') {
                    console.log('test');
                    this.setState({nothingText: "沒有可接案件"});
                }
            })     
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.caseContainer}>
                    {(this.state.nothingText === "") ? null : (<Text style={{ fontSize: 40, textAlign: 'center', color: "#BBBBBB" }}>{this.state.nothingText}</Text>)}
                    
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(this.state.dataList)}
                        renderRow={(rowData) =>
                            <TouchableOpacity style={styles.caseitemContainer}
                                onPress={this.slideUpOverlay}>
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
                <Animated.View style={[this.springAnimationXY.getLayout(), { position: "absolute", height: "100%", width: "100%", justifyContent: 'flex-end', }]}>
                    <View style={styles.overlay} onLayout={this.onLayout}>
                        <Image
                            source={require('../../../../../assets/img/Yes.png')}
                            style={{ height: 50, width: 50, tintColor: "#F37021" }}
                        />
                        <Text style={{ color: "#BBBBBB", fontSize: 40 }}>結案成功</Text>
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
    caseitemContainer: {
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
    }
})

export default UnprogressedCasePage;