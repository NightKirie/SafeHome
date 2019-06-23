import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class Name extends Component {  
    render() {
        return (
            <View>
                <Text style={{ color: "#F37021", fontSize: 50 }}>
                    {this.props.name} <Text style={{ color: "#BBBBBB", fontSize: 30 }}> 您好</Text>
                </Text>
            </View>
        );
    }
}

class HomeownerHomePage extends Component {
  render() {
    return (
		<View style={styles.backgroundContainer}>
			<View style={styles.container}>
				<View style={{ flex: 1, width: "100%" }}>
                        <View style={styles.containerName}>
                            <Image
                                source={require('../../../../../assets/img/Name_Background.png')}
                                style={{ position: 'absolute', width: "100%", height: "100%", }}
                            />
							<Name style={styles.textName} name="XXX"></Name>
                        </View>
                </View>
				<View style={{ flex: 1, width: "100%" }}>
					<View style={styles.containerWork}>
						<TouchableOpacity style={styles.containerItem}
                            onPress={() => this.props.navigation.navigate('ApplyCasePage')}>
                            <Image
                                source={require('../../../../../assets/img/ApplyCase_Background.png')}
                                style={{ position: 'absolute', width: "100%", height: "100%",}}
                            />
                            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>申請勘查</Text>
                    	</TouchableOpacity>
						<TouchableOpacity style={styles.containerItem}
                            onPress={() => this.props.navigation.navigate('ApplyCasePage')}>
                            <Text style={{ color: "#BBBBBB", fontSize: 25, fontWeight: "bold" }}>案件紀錄</Text>
                    	</TouchableOpacity>
                	</View>
                </View>
      		</View>
		</View>
      
    );
  }
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
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
		height: "70%",
		marginBottom: "30%"
    },
    containerName: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "90%",
        backgroundColor: "white"
    },
    containerWork: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#F2F1EF",
        width: "100%",
    },

    containerItem: {
        width: "48%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1
    }
})
export default HomeownerHomePage;