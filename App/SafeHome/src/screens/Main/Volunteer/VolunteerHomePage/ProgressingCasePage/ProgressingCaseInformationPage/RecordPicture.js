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

class RecordPicture extends Component {
    constructor() {
        super();
        this.state = {
            picList: {},
            picNum: 1,
        };
    }

    addNewPic = () => {
        this.props.navigation.navigate('TakePic', { caseSN: this.props.navigation.state.params.caseSN, picNum: this.state.picNum })        
    }

    updatePicList = () => {
        let items = Array.apply(null, Array(Math.ceil(this.state.picNum / 3) * 3)).map((v, i) => {
            /* For add new floor plan */
            if (i === this.state.picNum - 1)
                return (
                    <View style={{ flex: 1, flexDirection: 'column', margin: "3%" }}>
                        <TouchableOpacity
                            onPress={() => this.addNewPic()}>
                            <Image
                                id={i}
                                style={[styles.imageThumbnail, style = { borderColor: "#000000", borderWidth: 1 }]}
                                source={{ uri: `http://placehold.it/200x200/F2F1EF/F37021?text=%2b` }} />
                        </TouchableOpacity>
                    </View>);
            /* For invisiable dumbed floor, for better css looking */
            else if (i >= this.state.picNum) {
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
                                source={{ uri: `http://placehold.it/200x200/FFFFFF/F37021?text=Pic${i + 1}` }} />
                        </TouchableOpacity>
                    </View>);
        });
        this.setState({
            //Setting the data source
            picList: items,
        });
    }

    componentDidMount() {
        this.updatePicList();
    }
    
    render() {
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.setState((prevState, props) => ({
                    picNum: (this.props.navigation.state.params.newPicNum == null) ? prevState.picNum : this.props.navigation.state.params.newPicNum
                }), () => this.updatePicList());
            }
        );
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={this.state.picList}
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
export default RecordPicture;

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

