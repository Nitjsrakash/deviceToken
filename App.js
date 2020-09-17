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
import DeviceInfo from 'react-native-device-info';

import ListItem from './ListItem'

class App extends Component{
  constructor(props){
   super(props);
   this.state = {
     jsonData: '',
   }
  }
  async _getProtectedQuote() {
    var DEMO_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDAyNTUxOTIsImp0aSI6IkNmc0lJRmYxWm43TUNJdUJrS2pKVVEiLCJpc3MiOiJodHRwczpcL1wvcmVzb3VyY2VzLnZlZ2E2LmluZm9cLyIsIm5iZiI6MTYwMDI1NTIwMiwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsImFwcF91cmwiOiJOVWxsIn19.Y4UpB0--8kQWHFHrONhyJy_jGl3VmDZ93Y-qn7yD6tLZRmzktXeIf4YTdraNIMrYTucuVYLB6VrWVhN4TrZpaA"
    fetch("https://resources.vega6.info/get-photo/search", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + DEMO_TOKEN
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Respose Data:",responseData.data)
      this.setState({jsonData:responseData.data})
    })
    .done();
  }
  componentDidMount(){
    this._getProtectedQuote()
  }
  setData(item){
    console.log("Item:",item)
   return(
     <View></View>
   )
  }
  render(){
    const dataValue = JSON.stringify(this.state.jsonData)
      return(
        <View>
           <View style = {{height :50,backgroundColor:'red'}}>
             <Text style = {{alignSelf:'center',alignItems:'center',fontSize:20}}>Photo List</Text>
           </View>
         {dataValue != '' ? 
           <View style = {{}}>
            <FlatList
              data={this.state.jsonData}
              renderItem={({ item }) => (
              <ListItem
                  itemData = {item}
              />
             )}
              // keyExtractor={item => item.name}
            />
          </View>:
            <View>
               <Text>JsonData Null</Text>
           </View>}
        </View>
           
      )
    }
  
};

export default App