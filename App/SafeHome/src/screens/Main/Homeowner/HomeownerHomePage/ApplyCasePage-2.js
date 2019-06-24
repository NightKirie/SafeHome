import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geocoder from 'react-native-geocoder';
import { createStackNavigator } from 'react-navigation';

/*  套件：
    1. 時間的picker
    npm install react-native-date-picker --save
    react-native link react-native-date-picker
    2. 有placeholder的picker
    npm install native-base --save
    react-native link

*/ 

class ApplyCasePage extends Component {
    


    constructor(props) {
        super(props);
        this.state = {
            county: '',
            district: '',
            adress: '',
            age: '',
            type: '',
            floors: '',
            lat: 0,
            lng: 0,
            date: new Date(),
            isDateTimePickerVisible: false
        }
    };

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <ScrollView style={styles.container}>

                    <View style={styles.containertitle}>
                        <View><Text style={{textAlign:'left', color: "#BBBBBB", fontSize: 30}}>房屋基本資料</Text></View>
                        <View><Text style={{textAlign:'right', color: "#BBBBBB", fontSize: 30}}>2/2</Text></View>
                    </View>

                    <View style={styles.containertable}>
                        <View><Text style={{textAlign:'left', color: "#F37021", fontSize: 25 }}>地址</Text></View>
                        <View style={styles.container_TWO_input}>                       
                                <View style={styles.containerItem}>
                                    <Picker 
                                        selectedValue={this.state.county}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({county: itemValue})
                                        }>
                                            <Picker.Item color='#BBBBBB' label="縣/市" value=""/>
                                            <Picker.Item color='#BBBBBB' label="基隆市" value="基隆市"/>		
                                            <Picker.Item color='#BBBBBB' label="台北市" value="台北市"/>		
                                            <Picker.Item color='#BBBBBB' label="新北市" value="新北市"/>		
                                            <Picker.Item color='#BBBBBB' label="桃園縣" value="桃園縣"/>		
                                            <Picker.Item color='#BBBBBB' label="新竹市" value="新竹市"/>		
                                            <Picker.Item color='#BBBBBB' label="新竹縣" value="新竹縣"/>		
                                            <Picker.Item color='#BBBBBB' label="苗栗縣" value="苗栗縣"/>		
                                            <Picker.Item color='#BBBBBB' label="台中市" value="台中市"/>		
                                            <Picker.Item color='#BBBBBB' label="彰化縣" value="彰化縣"/>		
                                            <Picker.Item color='#BBBBBB' label="南投縣" value="南投縣"/>		
                                            <Picker.Item color='#BBBBBB' label="雲林縣" value="雲林縣"/>		
                                            <Picker.Item color='#BBBBBB' label="嘉義市" value="嘉義市"/>		
                                            <Picker.Item color='#BBBBBB' label="嘉義縣" value="嘉義縣"/>		
                                            <Picker.Item color='#BBBBBB' label="台南市" value="台南市"/>		
                                            <Picker.Item color='#BBBBBB' label="高雄市" value="高雄市"/>		
                                            <Picker.Item color='#BBBBBB' label="屏東縣" value="屏東縣"/>		
                                            <Picker.Item color='#BBBBBB' label="台東縣" value="台東縣"/>		
                                            <Picker.Item color='#BBBBBB' label="花蓮縣" value="花蓮縣"/>		
                                            <Picker.Item color='#BBBBBB' label="宜蘭縣" value="宜蘭縣"/>		
                                            <Picker.Item color='#BBBBBB' label="澎湖縣" value="澎湖縣"/>		
                                            <Picker.Item color='#BBBBBB' label="金門縣" value="金門縣"/>		
                                            <Picker.Item color='#BBBBBB' label="連江縣" value="連江縣"/>	
                                    </Picker>
                                </View>
                                <View style={styles.containerItem}>
                                    <TextInput
                                        placeholder={"郵遞區號"}
                                        value={this.state. district}
                                        onChangeText={(Postal_code) => {
                                            this.setState({ district :  Postal_code});
                                        }}
                                    />
                                </View> 
                            
                        </View>
                        <View style={styles.container_TWO_input}>
                            <TextInput
                                placeholder={"地址"}
                                value={this.state.adress}
                                onChangeText={(adress) => {
                                    this.setState({adress : adress});
                                    Geocoder.geocodeAddress(adress).then(res => {
                                        this.setState({ lat : position.lat,
                                                        lng : position.lng});
                                        // res is an Array of geocoding object (see below)
                                    })
                                    .catch(err => console.log(err))
                                    
                                }}
                            />

                        </View>
                        <View>
                            <Text style={{textAlign:'left', color: "#F37021", fontSize: 25 ,marginTop:"1.5%"}}>其他</Text>
                        </View>
                        <View style={styles.container_TWO_input}>
                            <View style={styles.containerItem}>
                                <Picker 
                                    selectedValue={this.state.age}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({age: itemValue})
                                    }>
                                    <Picker.Item color='#BBBBBB' label="屋齡" value="" />  
                                    <Picker.Item color='#BBBBBB' label="1~10年" value="1-10" />
                                    <Picker.Item color='#BBBBBB' label="10~20年" value="10-20" />
                                    <Picker.Item color='#BBBBBB' label="20年以上" value=">20" />
                                </Picker>
                            </View>
                                <View style={styles.containerItem}>
                                    <Picker 
                                        selectedValue={this.state.type}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({type: itemValue})
                                        }>
                                        <Picker.Item color='#BBBBBB' label="房屋類別" value="" />  
                                        <Picker.Item color='#BBBBBB' label="平房" value="平房" />
                                        <Picker.Item color='#BBBBBB' label="公寓" value="公寓" />
                                        <Picker.Item color='#BBBBBB' label="透天" value="透天" />
                                        <Picker.Item color='#BBBBBB' label="大樓" value="大樓" />
                                    </Picker>
                                </View>
                        </View>
                        <View style={styles.container_TWO_input}>
                            <View style={styles.containerItem}>
                                <TextInput
                                        placeholder={"總樓層"}
                                        value={this.state. floors}
                                        onChangeText={(floors) => {
                                            this.setState({ floors : floors});
                                        }}
                                />
                            </View>
                            <View style={{width:"49%"}}>

                            </View>
                        </View>
                        <View style={styles.containerinput}>
                            <TextInput
                                placeholder={"備註"}
                                value={this.state.adress}
                                onChangeText={(adress) => {
                                    this.setState({adress : adress});}}
                            />
                        </View>
                        
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.containerBotton}
                    onPress={() => this.props.navigation.navigate('HomeownerHomePage')}
                >
                    <Text style={{ marginTop: "4%", color: "white", fontSize: 20}}>完成</Text>
                </TouchableOpacity>
            </View>
                        
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: "#F2F1EF"
    },
    container: {
        margin: "10%",
        width: "80%",
        height: "100%",
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: "5%",
        width: "90%"
    },

    containertable: {
        marginHorizontal : "5%",
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "90%",
        height: "60%",
        marginBottom: "5%"
    },

    container_TWO_input: {
        marginBottom: "1%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: "18%"
    },
    containerinput: {
        marginTop: "1%",
        borderWidth: 0.5,
        borderColor: 'black',
        height: "30%"
    },

    containerItem: { 
        width: "49%", 
        borderBottomWidth: 0.5,  
        borderBottomColor: 'black'
    },
    containerBotton: {
        marginBottom: "10%",
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

})
export default ApplyCasePage;
