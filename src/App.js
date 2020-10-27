/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native'

import Routing from './Routing'

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, }} >
        <Routing />
      </SafeAreaView >
    );
  }
}