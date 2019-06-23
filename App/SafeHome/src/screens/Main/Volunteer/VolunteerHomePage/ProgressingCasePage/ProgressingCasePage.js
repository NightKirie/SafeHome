import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ListView } from 'react-native';

const data = require('../../../../../../assets/json/progressedcases.json');

class ProgressingCasePage extends Component {
    constructor() {
        super();
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    };
    nextPage = () => {
        this.props.navigation.navigate('ProgressingCaseInformationPage')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.caseContainer}>
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(data)}
                        renderRow={(rowData) =>
                            <TouchableOpacity style={styles.caseitemContainer}
                                onPress={this.nextPage}>
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 35, color: "#BBBBBB", textAlign: "center" }}>{rowData.name}</Text>
                                </View>
                                <View style={{ justifyContent: "flex-end", marginRight: "3%" }}>
                                    <Image
                                        source={require('../../../../../../assets/img/ICONS/Compose.png')}//照片位置需要再調整
                                        style={{ height: 17, width: 17, tintColor: "#BBBBBB", margin: 3 }}
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
        height: "100%",
        width: "100%",
        marginTop: "8%"
    },
    caseitemContainer: {
        paddingBottom: "5%",
        paddingTop: "2%",
        marginTop: "0.5%",
        borderColor: "#DCDCDC",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "white",
        paddingLeft: "5%",
        paddingRight: "3%",
    },
})
export default ProgressingCasePage;