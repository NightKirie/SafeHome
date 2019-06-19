import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class RecordPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>RecordPage</Text>
            </View>
        );
    }
}
export default RecordPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});