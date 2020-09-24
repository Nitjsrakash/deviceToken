/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage ,Alert, FlatList
} from 'react-native';


import Home from './src/component/Home'


class App extends Component{
  constructor(props){
   super(props);
  }
  

  render(){
      return(
        <Home/>
      )
    }
  
};

export default App