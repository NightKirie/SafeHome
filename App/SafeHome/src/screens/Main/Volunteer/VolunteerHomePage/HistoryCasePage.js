import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class HistoryCasePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HistoryCasePage</Text>
            </View>
        );
    }
}
export default HistoryCasePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});