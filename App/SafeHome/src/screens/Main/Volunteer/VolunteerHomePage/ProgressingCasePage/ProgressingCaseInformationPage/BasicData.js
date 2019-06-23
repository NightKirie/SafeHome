import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class BasicData extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>BasicData</Text>
            </View>
        );
    }
}
export default BasicData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});