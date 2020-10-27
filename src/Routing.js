import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screens
import PermissionsScreen from './screens/PermissionsScreen'
import ScannerScreen from './screens/ScannerScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'


/** Main Navigator of the app */
const MainNavigator = () => (
    <Stack.Navigator headerMode="none" initialRouteName='PermissionsScreen'>
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
    </Stack.Navigator>
);

/** Theme will help to change app light mode to dark mode */
export default AppNavigator = () => {

    const MyTheme = {
        dark: false,
        colors: {
            primary: 'rgb(255, 45, 85)',
            background: 'rgb(255, 255, 255)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <MainNavigator />
        </NavigationContainer>
    )
};