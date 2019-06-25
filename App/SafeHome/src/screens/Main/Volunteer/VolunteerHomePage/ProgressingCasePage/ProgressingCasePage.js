import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ListView } from 'react-native';
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

class ProgressingCasePage extends Component {
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
        }
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
        this.getProgressingCase();
    };
    
    
    getProgressingCaseSpec = (sn) => {
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
                            return { 
                                caseSN: $('li.sn').text(),
                                caseName: $('li.name').text(), 
                                casebuildingType: $('li.buildingType').text(),
                                caseAddress: $('li.address').text(),
                                casePhoneNum: $('li.phone').text(),
                                caseDate: $('li.applyDate').text(),
                            };
                        }
                        else if (status === 'error') {
                            return { 
                                caseSN: "",
                                caseName: "案件資料錯誤", 
                                casebuildingType: "",
                                caseAddress: "",
                                casePhoneNum: "",
                                caseDate: "",
                            };
                        }
                    })
                    .then((rowData) => {
                        this.props.navigation.navigate('ProgressingCaseInformationPage', rowData);
                    })
            })
        
    }



    getProgressingCase = () => {
        fetch('http://luffy.ee.ncku.edu.tw:13728/check/volunteer/shownotcheckedcases/', { //發送HTTP post request提交表單
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.caseContainer}>
                    {(this.state.nothingText === "") ? null : (<Text style={{ fontSize: 40, textAlign: 'center', color: "#BBBBBB" }}>{this.state.nothingText}</Text>)}
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(this.state.dataList)}
                        renderRow={(rowData) =>
                            <TouchableOpacity style={styles.caseItemContainer}
                                onPress={() => this.getProgressingCaseSpec(rowData.sn)}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 35, color: "#BBBBBB", textAlign: "center" }}>{rowData.name}</Text>
                                </View>
                                <View style={{ alignItems: "center", justifyContent: "center", marginRight: "3%" }}>
                                    <Image
                                        source={require('../../../../../../assets/img/ICONS/Compose.png')}//照片位置需要再調整
                                        style={{ height: 17, width: 17, tintColor: "#BBBBBB" }}
                                    />
                                </View>
                            </TouchableOpacity>}
                    />
                </View>
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
        paddingTop: "3%",
        paddingBottom: "5%",
        paddingHorizontal: "5%",
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: "white",
    },
})
export default ProgressingCasePage;