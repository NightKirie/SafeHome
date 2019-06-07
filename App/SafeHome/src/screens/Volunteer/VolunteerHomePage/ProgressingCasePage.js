import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ProgressingCasePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ProgressingCasePage</Text>
            </View>
        );
    }
}
export default ProgressingCasePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});