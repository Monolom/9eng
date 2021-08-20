import React, {useState} from 'react'
import {View,StyleSheet,TouchableOpacity,Button,Modal,Text} from 'react-native'
import { ceil } from 'react-native-reanimated'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'


export const ModalFinal = ({visible,myClose,points}) => {

    return (

        <Modal  visible={visible} transparent={false} repeat>
            <View style={styles.directContainer}>

                <View style={styles.shadow}>
                <View style={styles.textContainer}>
                <Text style={styles.textHead}>Готово!</Text>
                <View style={styles.textPointWraper}><Text style={styles.textDefault}>Ваш результат:</Text></View>
                <Text style={styles.textPoint}>{points}</Text>
                </View>
                </View>

                <TouchableOpacity onPress ={myClose} style={{width: '40%',    marginTop: 60}} >
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
       fontSize: 25
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