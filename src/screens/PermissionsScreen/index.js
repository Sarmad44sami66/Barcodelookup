import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Permissions, { request, RESULTS, PERMISSIONS } from 'react-native-permissions';

const permissionKey = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
})

export default class PermissionsScreen extends Component {

    constructor(props) {
        super(props)

        this.checkPermission()
    }

    checkPermission = () => {
        Permissions.check(permissionKey)
            .then(result => {
                this.handleResults(result)
            }).catch(error => {
                console.log("Permission Error: " + JSON.stringify(error))
            });
    }

    requestPermission = () => {
        Permissions.request(permissionKey).then(result => {
            this.handleResults(result)
        });
    }

    handleResults = (result) => {
        switch (result) {
            case RESULTS.UNAVAILABLE:

                break;
            case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                break;
            case RESULTS.GRANTED:
                this.props.navigation.replace('ScannerScreen')
                break;
            case RESULTS.BLOCKED:
                Permissions.openSettings().catch(() => console.warn('cannot open settings'));
                break;
            default:
                console.log('default')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    hearderText={'IN ORDER TO USE THE APPLICATION'}
                />
                <View style={styles.border} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.requestPermission()
                        }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{"ALLOW PERMISSIONS"}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    border: {
        width: '100%',
        height: 2,
        backgroundColor: '#1E1C2A'
    },
    buttonStyle: {
        width: '80%',
        height: 55,
        borderRadius: 20,
        backgroundColor: '#2072d6',
        alignItems: 'center',
        justifyContent: 'center'
    }
})