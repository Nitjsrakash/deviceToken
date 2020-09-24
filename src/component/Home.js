import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage ,Alert, FlatList,Image
} from 'react-native';

import {getFetch} from '../Util/ApiManager/ApiCall'

import ListItem from './ListItem'

class Home extends Component{
  constructor(props){
   super(props);
   this.state = {
     jsonData: '',
   }
  }
  
  componentDidMount(){
    getFetch().then(data =>{
      this.setState({
          jsonData: data
      })
  })
  }

  render(){
    const dataValue = JSON.stringify(this.state.jsonData)
      return(
        <View>
           <View style = {{height :50,backgroundColor:'red',justifyContent:'center'}}>
             <Text style = {{alignSelf : "center",fontSize:20}}>Photo List</Text>
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
            //   keyExtractor={item => item.name}
            />
          </View>:
            <View>
               <Text>JsonData Null</Text>
           </View>}
        </View>
           
      )
    }
  
};

export default Home