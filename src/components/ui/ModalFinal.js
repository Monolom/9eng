import React, {useState} from 'react'
import {View,StyleSheet,TouchableOpacity,Button,Modal,Text} from 'react-native'
import { ceil } from 'react-native-reanimated'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'


export const ModalFinal = ({visible,myClose,points}) => {

    return (

        <Modal  visible={visible} transparent={false} repeat>
            <View style={styles.directContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.textHead}>Готово!</Text>
                <View style={styles.textPointWraper}><Text style={styles.textDefault}>Ваш результат:</Text><Text style={styles.textPoint}>{points}</Text></View>
            </View>
            <TouchableOpacity onPress ={myClose} >
                <Text style={styles.button}>
                    ОК
                </Text>
            </TouchableOpacity>
            </View>
        </Modal>

        )


    }
const styles = StyleSheet.create({
  
   directContainer: {
       flex: 1,
       justifyContent: "center",
       alignContent: "center",
       alignItems: 'center',
       backgroundColor: THEME.BACK_GROUND
   },
 
   textContainer: {
    justifyContent: "center",
       alignContent: "center",
       alignItems: 'center',
   },
   textHead: {
       fontSize: 30,
    
   },
   textPointWraper:{
       marginTop: 20,
       flexDirection: "row"
   },
   textDefault: {
       fontSize: 25
   },
   textPoint: {
       fontSize: 25,
       color: THEME.AKCENT_COLOR,
       marginLeft: 10
   },
   button:{
       fontSize: 25,
       backgroundColor: THEME.MAIN_COLOR,
       color: "#fff",
       paddingVertical: 10,
       paddingHorizontal: 20,
       minWidth: 150,
       textAlign: 'center',
       borderRadius: 5,
       marginTop: 30
   }

})