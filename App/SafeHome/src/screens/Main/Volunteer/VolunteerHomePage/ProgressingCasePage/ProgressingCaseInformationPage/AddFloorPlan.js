import React, { Component } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from "react-native";

class AddFloorPlan extends Component {
    constructor() {
        super();
        this.state = {
            floorPlanList: {},
            floorPlanNum: 1,
        };

    }


    addNewFloorPlan = () => {
        this.props.navigation.navigate('FloorPlan', { caseSN: this.props.navigation.state.params.caseSN, floorPlanNum: this.state.floorPlanNum })
        // .then()
        
    }

    updatePlanFloorList = () => {
        let items = Array.apply(null, Array(Math.ceil(this.state.floorPlanNum / 3) * 3)).map((v, i) => {
            /* For add new floor plan */
            if (i === this.state.floorPlanNum - 1)
                return (
                    <View style={{ flex: 1, flexDirection: 'column', margin: "3%" }}>
                        <TouchableOpacity
                            onPress={() => this.addNewFloorPlan()}>
                            <Image
                                id={i}
                                style={[styles.imageThumbnail, style = { borderColor: "#000000", borderWidth: 1 }]}
                                source={{ uri: `http://placehold.it/200x200/F2F1EF/F37021?text=%2b` }} />
                        </TouchableOpacity>
                    </View>);
            /* For invisiable dumbed floor, for better css looking */
            else if (i >= this.state.floorPlanNum) {
                return (
                    <View style={{ flex: 1, flexDirection: 'column', margin: "3%", opacity: 0 }}>
                        <TouchableOpacity >
                            <Image
                                id={i}
                                style={styles.imageThumbnail} />
                        </TouchableOpacity>
                    </View>);
            }
            /* For Done floor */
            else
                return (
                    <View style={{ flex: 1, flexDirection: 'column', margin: "3%" }}>
                        <TouchableOpacity>
                            <Image
                                id={i}
                                style={[styles.imageThumbnail, style = { borderColor: "#000000", borderWidth: 1 }]}
                                source={{ uri: `http://placehold.it/200x200/FFFFFF/F37021?text=${i + 1}F` }} />
                        </TouchableOpacity>
                    </View>);
        });
        this.setState({
            //Setting the data source
            floorPlanList: items,
        });
    }

    componentDidMount() {
        this.updatePlanFloorList();

    }

    willFocus() {
        console.log(this.props.navigation.state.params.floorPlanNum)
    }

    render() {
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState((prevState, props) => ({
                    floorPlanNum: (this.props.navigation.state.params.newFloorPlanNum == null) ? prevState.floorPlanNum : this.props.navigation.state.params.newFloorPlanNum
                }), () => this.updatePlanFloorList());
            }
        );
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.floorPlanList}
                    renderItem={({ item }) => (
                        item
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
export default AddFloorPlan;

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        //margin: "5%",
        paddingTop: 30,
        paddingHorizontal: "3%",
        backgroundColor: "#F2F1EF"
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        aspectRatio: 1,
    },
});

