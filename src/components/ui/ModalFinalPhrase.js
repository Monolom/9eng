import React, {useState} from 'react'
import {View,StyleSheet,TouchableOpacity,Button,Modal,Text,Dimensions} from 'react-native'
import { ceil } from 'react-native-reanimated'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'


export const ModalFinalPhrase = ({visible,myClose,points,closeModal}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const sDisp = () => {
      if(windowHeight < 620){
        return true
      }else{
        return false
      }  
    }

    return (

        <Modal  visible={visible} transparent={false} repeat>
            <View style={styles.directContainer}>

                <View style={{...styles.shadow, height: sDisp()? 240 : 350}}>
                <View style={styles.textContainer}>
                <Text style={styles.textHead}>Готово!</Text>
                <View style={styles.textPointWraper}><Text style={{...styles.textDefault,fontSize: sDisp() ? 18 : 25}}>Вы всегда можете повторить фразы в разделе "база знаний"</Text></View>
                {/* <Text style={styles.textPoint}>{points}</Text> */}
                </View>
                </View>

                <TouchableOpacity onPress ={closeModal} style={{width: '40%',    marginTop: 30}} >
            <Text style={{...styles.button,backgroundColor:'#9E8AE3'}}>
                   Остаться
                </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress ={myClose} style={{width: '40%',    marginTop: 10}} >
                <Text style={styles.button}>
                    Ок
                </Text>
            </TouchableOpacity>
           
            </View>
        </Modal>

        )


    }
const styles = StyleSheet.create({
    shadow: {
        backgroundColor: '#fff',
        shadowColor: "#DCCAFF",
        shadowOffset: {
        width: 1,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 3.5,
        elevation: 6,
        borderRadius: 20,
        width: '80%',
        height: 350,
       
    },
  
   directContainer: {
       flex: 1,
       justifyContent: "center",
       alignContent: "center",
       alignItems: 'center',
       backgroundColor: '#fff',
     
      
   },
 
   textContainer: {
    justifyContent: "center",
       alignContent: "center",
       alignItems: 'center',
       width: '100%',
       height: '100%'
   },
   textHead: {
       fontSize: 32,
   },
   textPointWraper: {
       marginTop: 20,
       flexDirection: "row"
   },
   textDefault: {
       fontSize: 25,
       textAlign: 'center',
       paddingHorizontal: 15
   },
   textPoint: {
       fontSize: 50,
       color: "#3A9FE7",
       marginLeft: 10,
       marginTop: 20
   },
   
   button:{
    width: '100%',
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: "#3A9FE7",
    borderRadius: 20,
    overflow: 'hidden'
   },
   

})