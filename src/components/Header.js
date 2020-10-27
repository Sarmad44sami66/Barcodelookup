import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default Header = (props) => {

    return (
        <View style={[styles.container, props.containerStyle]} >
            <TouchableOpacity
                onPress={() => {
                    if (props.onLeftAction && typeof props.onLeftAction) {
                        props.onLeftAction()
                    }
                }}
                style={[styles.buttonContainer, props.leftButtonContainerStyle]}>
                {props.leftIcon &&
                    <Image
                        style={[styles.buttonIcon, props.leftButtonIconStyle]}
                        source={props.leftIcon}
                    />
                }
                {props.leftText &&
                    <Text style={[styles.buttonText, props.leftButtonTextStyle]}>
                        {props.leftText}
                    </Text>
                }
            </TouchableOpacity>
            <View style={[styles.centerComponentStyle, props.centerComponentExtraStyle]}>
                {props.centerComponent && props.centerComponent}
                {props.hearderText &&
                    <Text style={[styles.hearderText, props.hearderTextStyle]}>
                        {props.hearderText}
                    </Text>
                }
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (props.onRightAction && typeof props.onRightAction) {
                        props.onRightAction()
                    }
                }}
                style={[styles.buttonContainer, props.rightButtonContainerStyle]}>
                {props.rightIcon &&
                    <Image
                        style={[styles.buttonIcon, props.rightButtonIconStyle]}
                        source={props.leftIcon}
                    />
                }
                {props.rightText &&
                    <Text style={[styles.buttonText, props.rightButtonTextStyle]}>
                        {props.rightText}
                    </Text>
                }
            </TouchableOpacity>
        </ View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // paddingHorizontal: 20,
        height: 80,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    centerComponentStyle: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
    },
    buttonText: {

    },
    hearderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2072d6',
        textAlign: 'center'
    }
})