import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Input, Button } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

class BasicData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            volunteer: "",
            date: "",
            floors: "",
            designYear: "",
            householdCount: "",
            structure: "",
            name: "",
            phone: "",
        };
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.setState({
            date: date.getFullYear() + '/' +
                (date.getMonth() + 1) + '/' +
                date.getDate()
        }, () => { console.log(this.state.date) });
        this.hideDateTimePicker();
    };

    storeAndBack = async () => {   
        try {
            let data = this.state;
            delete data['isDateTimePickerVisible'];
            await AsyncStorage.setItem(this.props.navigation.state.params.caseSN, JSON.stringify({sn: this.props.navigation.state.params.caseSN, ...data}));
            Alert.alert("", "儲存成功！");
            this.props.navigation.navigate("ProgressingCaseInformationPage");

        } catch (error) {
            Alert.alert("", error);
            this.props.navigation.navigate("ProgressingCaseInformationPage");
        }
    }

    ignoreAndBack = async() => {
        try {
            this.props.navigation.navigate("ProgressingCaseInformationPage");
        } catch (error) {
            this.props.navigation.navigate("ProgressingCaseInformationPage");
            Alert.alert("", error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.namecontainer}>
                    <Text style={{ fontSize: 25, color: "#BBBBBB" }}>
                        {this.props.navigation.state.params.caseSN}
                    </Text>
                    <Text style={{ fontSize: 40, color: "#BBBBBB" }}>
                        {this.props.navigation.state.params.caseName}的住宅
                    </Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
                        <Input
                            value={this.state.volunteer}
                            onChangeText={(volunteer) => {
                                this.setState({ volunteer: volunteer });
                            }}
                            placeholderTextColor="#BBBBBB"
                            placeholder="調查者"
                            containerStyle={{ width: "50%", }}
                            inputContainerStyle={{ borderBottomColor: "#BBBBBB" }}>
                        </Input>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: "#BBBBBB", marginHorizontal: "3%" }} onPress={this.showDateTimePicker}>
                            <View style={{}}>
                                <Text style={{ fontSize: 18, color: "#BBBBBB" }}>
                                {(this.state.date === "") ?  "勘察日期" : (this.state.date)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
                        <Input
                            value={this.state.floors}
                            onChangeText={(floors) => {
                                this.setState({ floors: floors });
                            }}
                            placeholder="樓層"
                            placeholderTextColor="#BBBBBB"
                            containerStyle={{ width: "50%" }}
                            inputContainerStyle={{ borderBottomColor: "#BBBBBB" }}>
                        </Input>
                        <Input
                            value={this.state.designYear}
                            onChangeText={(designYear) => {
                                this.setState({ designYear: designYear });
                            }}
                            placeholderTextColor="#BBBBBB"
                            placeholder="設計年度"
                            containerStyle={{ width: "50%" }}
                            inputContainerStyle={{ borderBottomColor: "#BBBBBB" }}>
                        </Input>
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
                        <Input
                            value={this.state.householdCount}
                            onChangeText={(householdCount) => {
                                this.setState({ householdCount: householdCount });
                            }}
                            placeholderTextColor="#BBBBBB"
                            placeholder="戶數"
                            containerStyle={{ width: "50%" }}
                            inputContainerStyle={{ color: "#BBBBBB" }}
                            inputContainerStyle={{ borderBottomColor: "#BBBBBB" }}>
                        </Input>
                        <Input
                            value={this.state.structure}
                            onChangeText={(structure) => {
                                this.setState({ structure: structure });
                            }}
                            placeholderTextColor="#BBBBBB"
                            placeholder="結構形式"
                            containerStyle={{ width: "50%" }}
                            inputContainerStyle={{ borderBottomColor: "#BBBBBB" }}>
                        </Input>
                    </View>
                    <Input
                        value={this.state.name}
                        onChangeText={(name) => {
                            this.setState({ name: name });
                        }}
                        placeholderTextColor="#BBBBBB"
                        placeholder="聯絡人"
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        containerStyle={{ borderWidth: 1, marginTop: "2%", borderColor: "#BBBBBB" }}
                    />
                    <Input
                        value={this.state.phone}
                        onChangeText={(phone) => {
                            this.setState({ phone: phone });
                        }}
                        placeholderTextColor="#BBBBBB"
                        placeholder="聯絡方式（手機/電話）"
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        containerStyle={{ borderWidth: 1, marginTop: "2%", borderColor: "#BBBBBB" }}
                    />
                </View>
                <View style={{ width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                    <Button
                        onPress={() => {
                            this.storeAndBack();
                        }}
                        title={"保存"}
                        buttonStyle={{ backgroundColor: "#F37021" }}
                        containerStyle={{ alignItems: "center", flex: 1, justifyContent: "center" }}
                        titleStyle={{ color: "white", flex: 1, fontWeight: "bold" }} />
                    <View style={{ flex: 0.2 }}></View>
                    <Button
                        onPress={() => {
                            this.ignoreAndBack();
                        }}
                        title={"取消"}
                        buttonStyle={{ backgroundColor: "white", flex: 1 }}
                        containerStyle={{ alignItems: "center", flex: 1, justifyContent: "center" }}
                        titleStyle={{ color: "#BBBBBB", flex: 1, fontWeight: "bold" }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //justifyContent: 'center',
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
    namecontainer: {
        position: "relative",
        width: "90%",
        marginTop: "8%",
        backgroundColor: "white",
        paddingHorizontal: "5%",
        paddingBottom: "5%",
        marginBottom: "5%"
    },

});

export default BasicData;