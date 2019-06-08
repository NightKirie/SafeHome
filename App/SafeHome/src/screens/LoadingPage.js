import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import LoginPage from './Main/LoginPage';

class LoadingPage extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            isOverlayVisible: true,
            backgroundColorContainer: "#FFFFFF",
        }
        this.springAnimationXY = new Animated.ValueXY({ x: 0, y: 1000 })
    }

    /* For slide down the SafeHome icon */
    slideDown = () => {
        Animated.spring(
            this.springAnimationXY, {
                toValue: { x: 0, y: 0 },
            }
        ).start();
        this.setState({ backgroundColorContainer: "grey" });
        if (this.interval)  // Remove the timer
            clearInterval(this.interval);
    }

    /* If user doesn't click SafeHome icon after 3 seconds, automatically slide down it */
    setTimerlideDown = () => {
        this.interval = setInterval(this.slideDown, 1500);
    }

    login(loginUserType) {
       //alert(`${loginUserType}`)
        switch (loginUserType) {
            /* For householder */
            case 1:
                alert("Householder page is build in progress");
                break;
            /* For volunteer */
            case 2:
                this.props.navigation.navigate('VolunteerBottomTabNavigation');
                break;
            /* For technician */
            case 3:
                alert("Technician page is build in progress");
                break;
            default:
                alert("Type not found");
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, { backgroundColor: this.state.backgroundColorContainer }]}
                onPress={this.slideDown}
                onLayout={this.setTimerlideDown}
                activeOpacity={1}>
                <View style={{ position: "absolute" }}>
                    <Image
                        source={require('../../assets/img/plainorange-07.png')}
                        style={{ height: 100, width: 100 }}
                    />
                </View>
                <Animated.View style={[this.springAnimationXY.getLayout()]}>
                    <LoginPage
                        login={(loginUserType) => this.login(loginUserType)} />
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "grey",
        zIndex: 0,
    },
})

export default LoadingPage;