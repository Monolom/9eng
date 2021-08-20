import React, {useState,useRef,useEffect} from 'react'
import {ImageBackground,View,StyleSheet,TouchableOpacity,Button,Modal,Text,Image,Dimensions,Animated,Platform} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {Ionicons,FontAwesome5} from '@expo/vector-icons'
import { Checkbox } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import {ChatItem} from '../../components/ui/ChatItem'
import { registerCustomIconType } from 'react-native-elements'
import {refreshRepeat} from '../../store/actions/user'

export const StarModal = ({close,visible}) => {

  return (<Modal  transparent={true} visible={visible}>  
  <ImageBackground source={require('../../../assets/img/BG.jpg')} style={styles.rbacgroundImage}>
  <View style={styles.aWhiteBlock}>

</View>
<TouchableOpacity activeOpacity={1} style={{width: '100%', height: '100%'}} onPress={()=>{
        close(false)
        
         }}>
     <View style={{...styles.rBgWhite,justifyContent: 'center'}}>

     <TouchableOpacity activeOpacity={1} >
     <View style={styles.aContentWraper}>


      
     {/* <Image  style={styles.aLogoImage}
     source={require('../../../assets/img/atention.png')}>
     </Image> */}
     <Text style={styles.aBigText} >как получить доступ к материалу</Text>
     <Text style={styles.aSmalText}>чтобы получить доступ к новым урокам наберите по одной <Image style={{width: 25,height: 15}} source={require('../../../assets/img/star_4.png')}></Image> на каждом доступном уроке</Text>
     <Text style={{...styles.aSmalText,marginTop: 15,maxWidth: '70%'}}>повторение материала повышает уровень звёзд до <Image style={{width: 25,height: 15}} source={require('../../../assets/img/star_5.png')}></Image> и <Image style={{width: 25,height: 15}} source={require('../../../assets/img/star_6.png')}></Image></Text>

     <View style={styles.starWraper}>
            <View style={styles.starItem}>
                <Image style={styles.starImage} source={require('../../../assets/img/star_4.png')}></Image>
                <Text style={styles.starText}>новичёк</Text>
            </View>
            <View style={styles.starItem}>
                <Image style={styles.starImage} source={require('../../../assets/img/star_5.png')}></Image>
                <Text style={styles.starText}>продвинутый</Text>
            </View>
            <View style={{...styles.starItem,marginRight: 0}}>
                <Image style={styles.starImage} source={require('../../../assets/img/star_6.png')}></Image>
                <Text style={styles.starText}>эксперт</Text>
            </View>
     </View>

     <TouchableOpacity onPress={()=>{   

        close(false)
      
     }}>
         <Text style={styles.aButton}>
             закрыть
         </Text>
     </TouchableOpacity>
    
     </View>
     </TouchableOpacity>

 
</View>
</TouchableOpacity>
   </ImageBackground>
   </Modal>)

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
        justifyContent: 'space-between'
    },
    aContentWraper: {
        backgroundColor: '#fff',
      paddingHorizontal: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      position: 'relative'
   
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
        marginTop: 30,
        color: '#0b1c8c',
        fontFamily: 'sf-regular',
        marginBottom: 25
    },
    

})