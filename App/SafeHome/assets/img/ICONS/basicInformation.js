/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {Input, Button} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class basicInformation extends Component {
  static navigationOptions= {
    headerTitle:"基本資料",
    headerTitleStyle:{flex:2,textAlign:"center", },
    headerTintColor:"#F37021",
    headerRight:(<Image
        source={require('../../../assets/img/help-circle.png')}
        style={{height:25,width:25,tintColor:"#F37021",margin:3}}
        />)
    }
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: "調查日期"
    };
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = datePicked=> {
    console.log("A date has been picked: ", datePicked);
    const temp  = datePicked.toString();
    const dateTemp = temp.split(" ", 10);
    const realDate = dateTemp[2] + " " + dateTemp[1] + " " + dateTemp[3];
    this.setState({date: realDate});
    this.hideDateTimePicker();
  };
  render() {
    return (
      <View style={styles.container}>
            <View style={styles.namecontainer}>
                <Text style={{fontSize:40,color:"#BBBBBB"}}>
                    190027{/* importdata 流水號*/}
                </Text>
                <Text style={{fontSize:25,color:"#BBBBBB"}}>
                  xxx的住宅{/* importdata 名字*/}
                </Text>
                <View style={{justifyContent:"space-between", flexDirection:"row",width:"100%"}}>
                  <Input
                  placeholderTextColor="#BBBBBB"
                  placeholder="調查者"
                  containerStyle={{width:"50%", }}
                  inputContainerStyle={{borderBottomColor:"#BBBBBB"}}>
                  </Input>
                  <TouchableOpacity style={{flex:1, justifyContent:'center',borderBottomWidth:1,borderBottomColor:"#BBBBBB",marginHorizontal:"3%"}} onPress={this.showDateTimePicker}>
                    <View style={{}}>
                    <Text style={{fontSize:18,color:"#BBBBBB"}}>
                    {this.state.date}
                    </Text>
                    </View>
                  </TouchableOpacity>
                  <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  />
                </View>
                <View style={{justifyContent:"space-between", flexDirection:"row",width:"100%"}}>
                  <Input
                  placeholder="樓層"
                  placeholderTextColor="#BBBBBB"
                  containerStyle={{width:"50%"}}
                  inputContainerStyle={{borderBottomColor:"#BBBBBB"}}>
                  </Input>
                  <Input
                  placeholderTextColor="#BBBBBB"
                  placeholder="設計年度"
                  containerStyle={{width:"50%"}}
                  inputContainerStyle={{borderBottomColor:"#BBBBBB"}}>
                  </Input>
               </View>   
               <View style={{justifyContent:"space-between", flexDirection:"row",width:"100%"}}>
                  <Input
                  placeholderTextColor="#BBBBBB"
                  placeholder="戶數"
                  containerStyle={{width:"50%"}}
                  inputContainerStyle={{color:"#BBBBBB"}}
                  inputContainerStyle={{borderBottomColor:"#BBBBBB"}}>
                  </Input>
                  <Input
                  placeholderTextColor="#BBBBBB"
                  placeholder="結構形式"
                  containerStyle={{width:"50%"}}
                  inputContainerStyle={{borderBottomColor:"#BBBBBB"}}>
                  </Input>
               </View>
               <Input
                  placeholderTextColor="#BBBBBB"
                  placeholder="聯絡人"
               inputContainerStyle={{ borderBottomWidth: 0 }}
               containerStyle={{borderWidth:1,marginTop:"2%",borderColor:"#BBBBBB"}}
               />
               <Input
                  placeholderTextColor="#BBBBBB"
                  placeholder="聯絡方式（手機/電話）"
               inputContainerStyle={{ borderBottomWidth: 0 }}
               containerStyle={{borderWidth:1,marginTop:"2%",borderColor:"#BBBBBB"}}
               />      
            </View>
            <View style={{width:"90%",justifyContent:"space-between", flexDirection:"row"}}>
            <Button
                title={"提交"}
                buttonStyle={{backgroundColor:"#F37021"}}
                containerStyle={{alignItems:"center",flex:1,justifyContent:"center"}}
                titleStyle={{color:"white",flex:1}}/>
            <View style={{flex:0.2}}></View>
            <Button
                title={"提交"}
                buttonStyle={{backgroundColor:"white",flex:1}}
                containerStyle={{alignItems:"center",flex:1,justifyContent:"center"}}
                titleStyle={{color:"#BBBBBB",flex:1}}/>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        alignItems: 'center',
        //justifyContent: 'center',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        backgroundColor:"#F2F1EF",
        marginBottom:"2%",
  },
  namecontainer: {
        position:"relative",
        width:"90%",
        marginTop:"8%",
        backgroundColor:"white",
        paddingHorizontal:"5%",
        paddingBottom:"5%",
        marginBottom:"5%"
  },
  
});
