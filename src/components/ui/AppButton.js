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

export const AppButton = ({children, onPress,color=THEME.MAIN_COLOR}) => {


const Wraper 
= Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return(
        <Wraper  onPress={onPress} activeOpacity={0.2} >
            <View style={{...styles.button, backgroundColor: color,}}>
                
<Text style={styles.text}>

    {children}

</Text>
            </View>
        </Wraper>
    )
}

const styles = StyleSheet.create({
button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: 'center',
    height: 50,
    marginBottom: 30,
    width: '100%',
    maxWidth: 200
},
text: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center"
}
})