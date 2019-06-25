import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator } from 'react-navigation';
class TakePic extends Component {
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            if(data != null) {
                this.storeAndBack(data.uri)
            }
        }
    };

    storeAndBack = async (uri) => {   
        try {  
            const data = await AsyncStorage.getItem(this.props.navigation.state.params.caseSN);
            await AsyncStorage.setItem(this.props.navigation.state.params.caseSN, JSON.stringify({...JSON.parse(data), [`Pic${this.props.navigation.state.params.picNum}`]: uri }));
            Alert.alert("", "拍照成功！");
            this.props.navigation.navigate("RecordPicture", {newPicNum: (this.props.navigation.state.params.picNum+1)});

        } catch (error) {
            Alert.alert("", error);
            this.props.navigation.navigate("RecordPicture", {newPicNum: (this.props.navigation.state.params.picNum)});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: '拍照',
                        message: '要允許「好厝在在」拍照嗎？',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
export default TakePic;
