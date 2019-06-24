import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker, TextInput, TouchableOpacity} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
/*  套件：
    npm install react-native-modal-datetime-picker --save
    npm install react-native-maps –save
react-native link react-native-maps
npm install --save react-native-geocoder
react-native link react-native-geocoder
*/ 

class ApplyCasePage extends Component {
    


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lineID: '',
            phone: '',
            relation: '',
            isDateTimePickerVisible: false
        }
    };

      showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
      };
      
    render() {
        return (
            <ScrollView style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <View style={styles.containertitle}>
                        <View><Text style={{textAlign:'left', color: "#BBBBBB", fontSize: 30}}>基本資料</Text></View>
                        <View><Text style={{textAlign:'right', color: "#BBBBBB", fontSize: 30}}>1/2</Text></View>
                    </View>
                    <View style={styles.containertable}>
                        <View style={styles.containerinput}>
                            <TextInput
                                placeholder={" 姓名"}
                                value={this.state.name}
                                onChangeText={(name) => {
                                    this.setState({name : name});
                                }}
                            />
                        </View>

                        <View style={styles.containerinput}>
                            <TextInput
                                placeholder={" LINE ID"}
                                value={this.state.lineID}
                                onChangeText={(lineID) => {
                                    this.setState({lineID : lineID});}}
                            />
                        </View>

                        <View style={ styles.containerinput }>
                            <TextInput
                                placeholder={" 電話/手機號碼"}
                                value={this.state.phone}
                                onChangeText={(phone) => {
                                    this.setState({phone : phone.replace(/[^0-9]/g, '')});}}
                                keyboardType='phone-pad'
                            />
                        </View>
                        
                        <View style={ styles.containerinput }>
                            <Picker 
                                selectedValue={this.state.relation}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({relation: itemValue})
                                }>
                                <Picker.Item color='#BBBBBB' label="與屋主關係" value="" />  
                                <Picker.Item color='#BBBBBB' label="本人" value="本人" />
                                <Picker.Item color='#BBBBBB' label="家屬" value="家屬" />
                                <Picker.Item color='#BBBBBB' label="房客" value="房客" />
                                <Picker.Item color='#BBBBBB' label="其他" value="其他" />
                            </Picker>
                        </View>
                        <View style={ styles.containerinput }>
                        <TouchableOpacity
                            
                            color= "white"
                            onPress={this.showDateTimePicker} 
                            border= 'none'>
                            <View style={{margin:"4%"}}><Text style={{color: "#BBBBBB", fontSize: 15}}>希望的勘查日期</Text></View>
                        </TouchableOpacity>
                         
                        <DateTimePicker
                            locale='zh'
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                        </View>
                    </View>
                    
                    
                </View>
                <TouchableOpacity style={styles.containerItem}
                    onPress={() => this.props.navigation.navigate('ApplyCasePage_2')}>
                    <Text style={{marginTop: "5%",color: "white", fontSize: 20}}>下一步</Text>
                </TouchableOpacity>
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {

        width: "100%",
        height: "100%",
        backgroundColor: "#F2F1EF"
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        height: "70%",
        margin: "10%",
        marginBottom: "10%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    containertitle: {
        margin: "5%",
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%"
    },
    containertable: {
        margin: "5%",
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "90%",
        height: "75%",
    },
    containerinput: {
        borderWidth: 0.5,
        borderColor: 'black',
        width: "100%",
        height: "19%"
    },



    containerItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%",
        margin: "10%",
        width: "80%",
        height: "8%",
        backgroundColor: "#F37021",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }

})
export default ApplyCasePage;
