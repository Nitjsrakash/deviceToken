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

import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

 const fs = RNFetchBlob.fs;
 let imagePath = null;




class ListItem extends Component{

    constructor(props){
        super(props); 
        this.state={
          imageData:'',
          isDone: false,
        }
        // this.onDownloadImagePress = this.onDownloadImagePress.bind(this);

    }
    
      myShareImage = async (imageUrl) => {
          console.log("mayShare:",imageUrl)
        const shareOptions = {
            message:"This Share Image",
            url:imageUrl
        }
        try{
            const ShareResopnse =  await Share.open(shareOptions); 
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
              const imgData = `data:image/png;base64,${base64Data}`
              

                this.myShareImage(imgData)
              return fs.unlink(imagePath);
            });
            
    }
  //   onDownloadImagePress() {

  //     RNFS.downloadFile({
  //       fromUrl: 'https://facebook.github.io/react-native/img/header_logo.png',
  //       toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
  //     }).promise.then((r) => {
  //       this.setState({ isDone: true })
  //     });
  // }
    async onClick(url, id){
            const path = `${RNFS.DocumentDirectoryPath}/${id}.jpg`;
            await RNFS.downloadFile({ fromUrl: url, toFile: `file://${path}` }).promise
                .then((res) => {
                  console.log("RES:",res)
                    return res;
                })
                .catch((err) => {
                    return err;
                });
                
                RNFS.readFile(`file://${path}`, 'base64').then((res) => {
                  console.log("RES2:",res)
                let shareOptionsUrl = {
                    // title: 'My Application',
                    // message: 'Use my application',
                    url: `data:image/jpeg;base64,${res}`, // use image/jpeg instead of image/jpg
                    type:'image/jpg'
                    // social: Share.Social.WHATSAPP,
                    // subject: 'Share information from your application',
                    // saveToFiles: true,
                    // showAppsToView:true,
                };
                Share.open(shareOptionsUrl).catch(err => console.log(err));;
                // Share.shareSingle(shareOptionsUrl);
            })
        }
    
  render(){
       const data = this.props.itemData
       const imageUrl = data.url
      //  console.log(imageUrl)
      const id = 1
      // const preview = this.state.isDone ? (<View>
      //   <Image style={{
      //     width: 100,
      //     height: 100,
      //     backgroundColor: 'black',
      //   }}
      //     source={{
      //       uri: `file://${RNFS.DocumentDirectoryPath}/react-native.png`,
      //       scale: 1
      //     }}
      //   />
      //   <Text>{`file://${RNFS.DocumentDirectoryPath}/react-native.png`}</Text>
      // </View>
      // ) : null;
    return (
        <View>
          {/* <View>
            <Text onPress={this.onDownloadImagePress}>Download Image</Text>
            {preview}
          </View> */}

              {/* <TouchableOpacity
                style = {StyleSheet.button}
                onPress ={ () =>this.onClick("../../Assets/images.jpg",id)}
                >
                 <Image  source={require('../../Assets/images.jpg')}  style = {{height: 100, resizeMode : 'stretch', margin: 5 }} />
              </TouchableOpacity> */}

            {imageUrl != null ?
                <TouchableOpacity
                style = {StyleSheet.button}
                onPress ={ () =>this.onClick(imageUrl,id)}
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

const imageBase = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBwsOEBymJCgsAAAB5UlEQVRIx93US0jUYRQF8J9/xQe9TSjSjYVhFpEkKATVYLnQiqIW1SIIKZJa9VhJj4WLgogKJCgIote2RSBFEJSSVIQKUiCEBdJjkwrlg9F/C8d0apwZaVX37A73nO9yv/N9/POVkVbXPLUqLdJvQK87orM7pNoH4TS8dc2m1LJAiYitzhmLk0+ibmZpviYvfU8om0BUl3YrE8sP6E8incBmBB4mku82nlIeanXcZcN/zpChJw35FMZti7/GXEOzjEHb3xr0B7MU/F4LpwyybHEmRXuz3t+pTJCv0VVLrVAgN4nBMkWJwj9XmyPyQOCU0SR7f22VQ3EMWuzHevd1u6VM9QzhDYUaEcRFTYV72GhYaFSPH+pcmNHgvV0uxk/QrFbgo9AblcpEPFGc9CXEQ6csEaHQDp81oMpJD9I1CISiikG2PNfRLsfTdIMQCGOXOeC528ZibNp/TmDIYq+wQIVjMbYklo/UNZKp0BKP7FVgubuiiIhapzyu8ZMmV3ToM2K+nBj7zVHWeCbDBmNCX5x1XpdCg9MW9U697Di7IjXqVU6yl5xAjT6hUIdSp3+JX9iZ+ufO1aoBgbXKsc+40KAbqtJdZa6bWhxWYY/HxrQ6aE560qnxVtuuVLcOnb6me/J/UT8B4vwvuvTL3zYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDctMTFUMTQ6MTY6MjgrMDI6MDDqLw2gAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA3LTExVDE0OjE2OjI4KzAyOjAwm3K1HAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="

