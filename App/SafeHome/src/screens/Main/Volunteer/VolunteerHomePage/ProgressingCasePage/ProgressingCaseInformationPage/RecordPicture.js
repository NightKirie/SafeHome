import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class RecordPicture extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>RecordPicture</Text>
            </View>
        );
    }
}
export default RecordPicture;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});