import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Text

} from 'react-native' 

import { THEME } from '../../theme'
import {LinearGradient} from 'expo-linear-gradient'

export const AppButton = ({children, onPress,color=THEME.MAIN_COLOR}) => {




    return(
        <TouchableOpacity style={styles.buttonGeneral}  onPress={onPress} activeOpacity={0.2} >
           
               <LinearGradient style={styles.itemButtonWraperGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#659EE5', '#9C9DED', '#C39DF4']} >

            <View style={styles.button}>

<Text style={styles.text}>{children}</Text>

            </View>
            </LinearGradient>
         
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonGeneral: {
        width: '65%',
 justifyContent: 'center'
    
    },
    itemButtonWraperGradient: {
        marginBottom: 25,
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        width: '100%'
      
    },
button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: 'center',
    height: 50,
    
    width: '100%',

},
text: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: 'center',
    fontSize: 18
}
})