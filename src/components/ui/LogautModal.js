import React, {useState} from 'react'
import {Image,View,StyleSheet,TextInput,Button,Modal,Text,TouchableOpacity,Platform,ImageBackground} from 'react-native'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'
import { block } from 'react-native-reanimated'
import {LinearGradient} from 'expo-linear-gradient'
import {firebase} from '../../firebase/config'

export const LogautModal = ({visible,myClose}) => {

const goToWord = () => {

 
    CloseModal()

}
let  userUid = firebase.auth().currentUser.uid
const usersRef = firebase.database().ref('users').child(userUid).child('deviceId')
        return (

    <Modal  transparent={true} visible={visible}>  
  <ImageBackground source={require('../../../assets/img/BG.jpg')} style={styles.rbacgroundImage}>
  <View style={styles.aWhiteBlock}>

</View>
<TouchableOpacity activeOpacity={1} style={{width: '100%', height: '100%'}} onPress={()=>{
         myClose()
        
         }}>
     <View style={{...styles.rBgWhite,justifyContent: 'center'}}>

     <TouchableOpacity activeOpacity={1} >
     <View style={styles.aContentWraper}>


      
     <Image  style={styles.aLogoImage}
     source={require('../../../assets/img/atention.png')}>
     </Image>
     <Text style={styles.aBigText} >вы действительно хотите выйти?</Text>
     <Text style={styles.aSmalText}>для повторного входа в приложение потребуеться Ваши почта и пароль</Text>
    


     <View style={{flexDirection: 'row',justifyContent: 'space-between',width: '60%'}}>
     <TouchableOpacity onPress={()=>{   

usersRef.set(null).then(()=>{
    firebase.auth().signOut()
    myClose()
})

}}>
 <Text style={styles.aButton}>
   да
 </Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{   

myClose()

}}>
 <Text style={styles.aButton}>
    нет
 </Text>
</TouchableOpacity>
     </View>
   
    
     </View>
     </TouchableOpacity>

 
</View>
</TouchableOpacity>
   </ImageBackground>
   </Modal>
            )
  
    
}




const styles = StyleSheet.create({
    starItem: {
        marginRight: 20,
        alignItems: 'center'
    },
    starText: {
        fontFamily: 'sf-regular',
        color: '#a0a0a0',
        fontSize: 13

    },
    starWraper: {
        flexDirection: 'row',
        marginTop: 30
    },
    starImage: {
        width: 43,
        height: 43
    },
    rbacgroundImage : {
        flex: 1,
        position: 'relative',
        backgroundColor: '#202124'
      },
      aWhiteBlock: { flex: 1, opacity: 0.85,  backgroundColor: "#fff",  position: 'absolute',width: '100%',height: '100%'},
      rBgWhite: {
        flex: 1,
        justifyContent: 'space-between',

    },
    aContentWraper: {
        backgroundColor: '#fff',
      paddingHorizontal: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
      paddingBottom: 25
    },
    aLogoImage: {
        width: 50,
        height: 50,
        marginTop: 25
      },
      aBigText: {
        fontSize : 20,
        marginTop: 30,
        fontFamily: 'sf-semiB',
        textAlign: 'center'
      },
      aSmalText: {
        color: '#a0a0a0',
        marginTop: 15,
        fontFamily: 'sf-regular',
        textAlign: 'center',
        maxWidth: '80%',
        fontSize: 15,
    
    },
    aButton: {
        fontSize: 30,

        color: '#0b1c8c',
        fontFamily: 'sf-regular',

    },
    

})