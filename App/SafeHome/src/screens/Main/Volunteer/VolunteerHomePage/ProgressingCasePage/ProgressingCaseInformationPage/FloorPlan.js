import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { Button, } from 'react-native-elements';
import call from 'react-native-phone-call';


class FloorPlan extends Component {
    constructor() {
        super();
        this.state = {
            floorPlanPic: "",
        }
    };

    storeAndBack = async () => {   
        try {
            const data = await AsyncStorage.getItem(this.props.navigation.state.params.caseSN);
            await AsyncStorage.setItem(this.props.navigation.state.params.caseSN, JSON.stringify({...JSON.parse(data), [`floorPic${this.props.navigation.state.params.floorPlanNum}`]: this.state.floorPlanPic }));
            Alert.alert("", "儲存成功！");
            this.props.navigation.navigate("AddFloorPlan", {newFloorPlanNum: (this.props.navigation.state.params.floorPlanNum+1)});

        } catch (error) {
            Alert.alert("", error);
            this.props.navigation.navigate("AddFloorPlan", {newFloorPlanNum: (this.props.navigation.state.params.floorPlanNum)});
        }
    }

    ignoreAndBack = async() => {
        try {
            this.props.navigation.navigate("AddFloorPlan", {newFloorPlanNum: (this.props.navigation.state.params.floorPlanNum)});
        } catch (error) {
            this.props.navigation.navigate("AddFloorPlan", {newFloorPlanNum: (this.props.navigation.state.params.floorPlanNum)});
            Alert.alert("", error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.caseContainer}>
                </View>
                <View style={{ postition: "relative", width: "90%", marginTop: "5%", marginBottom: "5%", flexDirection: "row", }}>
                    <Button
                        onPress={()=>{this.storeAndBack()}}
                        title={"完成"}
                        titleStyle={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}
                        buttonStyle={{ backgroundColor: "#F37021", paddingLeft: "5%" }}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }} />
                    <Button
                        onPress={()=>{this.ignoreAndBack()}}
                        title={"取消"}
                        titleStyle={{ color: "#BBBBBB", fontSize: 20, fontWeight: "bold" }}
                        buttonStyle={{ backgroundColor: "#FFFFFF", paddingLeft: "5%" }}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginLeft: "2%" }} />
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
        height: "80%",
        backgroundColor: "white",
        marginTop: "5%",
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
export default FloorPlan;