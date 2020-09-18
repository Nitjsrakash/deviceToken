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
  AsyncStorage ,Alert, FlatList,Image, TouchableOpacity
} from 'react-native';
import Share from "react-native-share";
import ImgToBase64 from 'react-native-image-base64';
import RNFetchBlob from 'react-native-fetch-blob';
 const fs = RNFetchBlob.fs;
 let imagePath = null;

class ListItem extends Component{

    constructor(props){
        super(props); 
    }
    
      myShareImage(imageUrl){
          console.log("mayShare:",imageUrl)
        const shareOptions = {
            message:"This Share Image",
            url:imageUrl
        }
        try{
            const ShareResopnse =  Share.open(shareOptions); 
        }catch(error){
            console.log("error:",error); 
        }
    }

    base64call(imageUrl){
        RNFetchBlob.config({
            fileCache: true
          })
            .fetch("GET", imageUrl)
            .then(resp => {
                // the image path you can use it directly with Image component
                imagePath = resp.path();
                return resp.readFile("base64");
              })
            .then(base64Data => {
              const imgData = 'data:image/png;base64,'+base64Data
                this.myShareImage(imgData)
              return fs.unlink(imagePath);
            });
            
    }
  render(){
       const data = this.props.itemData
       const imageUrl = data.url
       console.log(imageUrl)
    return (
        <View>
            {imageUrl != null ?
                <TouchableOpacity
                style = {StyleSheet.button}
                onPress ={ () =>this.base64call(imageUrl)}
                >
                 <Image source={{uri :imageUrl}} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />
                </TouchableOpacity>
            
             :null
            }
               
         </View>
        
    );
  }
  
};

export default ListItem;


