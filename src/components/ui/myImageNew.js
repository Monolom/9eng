import React , {useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image,ActivityIndicator} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'
import {THEME} from "../../theme"
import ImageModal from 'react-native-image-modal'



export const MyImageNew = ({url}) => {


  
//   useEffect(  () => {

//     setLoad(true)

//  }, [url])

  const  [load,setLoad] = useState(true)

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

      const sDisp = () => {
        if(windowHeight < 620){
          return true
        }else{
          return false
        }
        
      }

        // var arr = url.toString().split("/")     
        // console.log(`uri for sound: ${url}`)    
        // var filename = arr[arr.length-1]
        // console.log('ищем',FileSystem.documentDirectory+filename)


        // async function checkFile(){
        //     await   FileSystem.getInfoAsync(FileSystem.documentDirectory+filename)
        //     .then(success =>{if(success.exists){
        //       setLoad(false)
        //         console.log('фаил есть',success.exists)
              
        //     }else{

        //         console.log('фаил нет',success.exists)
        //          goDounload()
                
        //     }})
        //     .catch(error =>{goDounload()})
        // }





    //   async function goDounload(){

    //     await FileSystem.downloadAsync(url, FileSystem.documentDirectory+ filename)
    //               .then(({uri})=>{
    //                 setLoad(false)
    //                 console.log("finished downloading to", uri)
    //               })
    //               .catch(error=>{
    //                 console.error(error);
    //               });
    //   }

    //   checkFile()
      
  const getHeight = () => {
    if (windowHeight < 880){
      return 160
    }
    else{
      return 220
    }
  }

// if(load == true){

  return <View   style={{...styles.activeImage,height:sDisp() ? 120 : getHeight(),width: sDisp() ? 120 : getHeight()}} >
  
  <Image

style={{...styles.activeImage,height: sDisp() ? 120 : getHeight(),width: sDisp() ? 120 : getHeight()}}

source = {{
    uri: url
  }} />
  
  </View>
// }else{
//   windowHeight
//   return       <Image

//   style={{...styles.activeImage,height: sDisp() ? 120 : getHeight(),width: sDisp() ? 120 : getHeight()}}
  
//   source = {{
//       uri: FileSystem.documentDirectory+ filename
//     }} />
  
}





const styles = StyleSheet.create({

    activeImage: {
        width: 220,  
        height: 220,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        resizeMode: 'stretch',
        }
})