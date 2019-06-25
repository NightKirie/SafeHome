import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { Button, } from 'react-native-elements';
import call from 'react-native-phone-call';

import qs from 'qs';

const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

class ProgressingCaseInformationPage extends Component {
    constructor() {
        super();
    };

    makeCall = () => {
        this.ignoreAndBack();
        let number = this.props.navigation.state.params.casePhoneNum;
        if (number.charAt(0) === '0')
            number = number.substr(1);
        const args = {
            number: "+886" + number,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    ignoreAndBack = async () => {
        try {
            this.props.navigation.navigate("ProgressingCaseInformationPage");
        } catch (error) {
            this.props.navigation.navigate("ProgressingCaseInformationPage");
            Alert.alert("", error);
        }
    }

    getData = async() => {
        const data = await AsyncStorage.getItem(this.props.navigation.state.params.caseSN);
        console.log(data);
        return data;
    }

    uploadData = async() => {
        await fetch('http://luffy.ee.ncku.edu.tw:13728/check/', {
            credentials: 'include',
        })
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                return htmlparser2.parseDOM(text);
            })
            .then((dom) => {
                let $ = cheerio.load(dom);
                return $('input[name="csrfmiddlewaretoken"]').val();
            })
            .then(async(csrf) => {
                let data = await AsyncStorage.getItem(this.props.navigation.state.params.caseSN);
                data = JSON.parse(data);
                console.log(data);
                let form = new FormData(); //這邊要用FormData的方法傳資料
                //以下格式為：form.append(要填的欄位, 內容)
                form.append('csrfmiddlewaretoken', csrf); //csrf_token
                form.append('sn', data.sn); //流水號
                form.append('volunteer', data.volunteer); //志工
                form.append('date', data.date); //檢查日期
                form.append('floors', data.floors); //地上樓層數
                form.append('designYear', data.designYear); //設計年分
                form.append('householdCount', data.householdCount); //戶數
                form.append('structure', data.structure); //結構形式
                form.append('name', data.name); //聯絡人
                form.append('phone', data.phone); //連絡電話
                for(let key in data) {
                    if(key.includes("Pic")) {
                        form.append('file', { uri: data[key], type: 'image/jpeg', name: `${key}.jpg` });
                    }
                }
                console.log(form);
                //↑uri: 設定檔案位置(path)，type: 設定檔案格式，name: 設定檔名，建議檔名有一定規則，這樣伺服器比較好處理
                //傳送多個檔案就多寫幾個form.append('file'...)即可
                fetch('http://luffy.ee.ncku.edu.tw:13728/check/upload/', {
                    method: 'post',
                    credentials: 'same-origin',
                    body: form //剛剛宣告的FormData
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
                            Alert.alert("", "上傳成功");
                        }
                        else if (status === 'error') {
                            Alert.alert("", "上傳失敗");
                        }
                        return "done";
                    })      
            })      
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.caseContainer}>
                    <View style={styles.titlecontainer}>
                        <View style={styles.namecontainer}>
                            <Text style={{ fontSize: 40, color: "#BBBBBB" }}>
                                {this.props.navigation.state.params.caseName}
                            </Text>
                            <Text style={{ fontSize: 25, color: "#BBBBBB" }}>
                                {this.props.navigation.state.params.casebuildingType}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Text style={{ fontSize: 20, color: "black" }}>
                                申請日期
                            </Text>
                            <Text style={{ fontSize: 20, color: "black" }}>
                                {this.props.navigation.state.params.caseDate}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.addresscontainer}>
                        <View>
                            <Text>
                                {this.props.navigation.state.params.caseAddress}
                            </Text>
                            <Text>
                                {this.props.navigation.state.params.casePhoneNum}
                            </Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Button title={"致電"}
                                onPress={() => this.makeCall()}
                                buttonStyle={{ backgroundColor: "white" }}
                                containerStyle={{ borderWidth: 1, borderColor: "#F37021" }}
                                titleStyle={{ color: "#F37021" }} />
                        </View>
                    </View>
                    <Button
                        title={"1. 基本資料表單"}
                        onPress={() => this.props.navigation.navigate("BasicData", this.props.navigation.state.params)}
                        buttonStyle={{ backgroundColor: "white" }}
                        containerStyle={{ borderWidth: 1, borderColor: "#BBBBBB", alignItems: "flex-start", marginTop: "8%", borderRadius: 0 }}
                        titleStyle={{ color: "#BBBBBB" }} />
                    <Button
                        title={"2. 建築平面圖"}
                        onPress={() => this.props.navigation.navigate("AddFloorPlan", this.props.navigation.state.params)}
                        buttonStyle={{ backgroundColor: "white" }}
                        containerStyle={{ borderWidth: 1, borderColor: "#BBBBBB", alignItems: "flex-start", marginTop: "5%", borderRadius: 0 }}
                        titleStyle={{ color: "#BBBBBB" }} />
                    <Button
                        title={"3. 劣化照片"}
                        onPress={() => this.props.navigation.navigate("RecordPicture", this.props.navigation.state.params)}
                        buttonStyle={{ backgroundColor: "white" }}
                        containerStyle={{ borderWidth: 1, borderColor: "#BBBBBB", alignItems: "flex-start", marginTop: "5%", marginBottom: "5%", borderRadius: 0 }}
                        titleStyle={{ color: "#BBBBBB" }} />
                </View>
                <View style={{ postition: "relative", width: "90%", marginTop: "10%", marginBottom: "5%" }}>
                    <Button
                        onPress={() => this.uploadData()}
                        title={"提交"}
                        buttonStyle={{ backgroundColor: "#F37021", paddingLeft: "45%", paddingRight: "45%" }}
                        containerStyle={{ alignItems: "center", justifyContent: "center" }}
                        titleStyle={{ color: "white", fontSize: 17, fontWeight: "bold" }} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        backgroundColor: "#F2F1EF",
        marginBottom: "2%",
    },
    caseContainer: {
        position: "relative",
        width: "90%",
        marginTop: "8%",
        backgroundColor: "white",
        paddingHorizontal: "5%"
    },
    titlecontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    addresscontainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    }
})
export default ProgressingCaseInformationPage;