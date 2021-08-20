import React, {useState} from 'react'
import {View,StyleSheet,TouchableOpacity,Button,Modal,Text,TextInput,Dimensions,Alert} from 'react-native'
import { ceil } from 'react-native-reanimated'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import {codeRefresh} from '../../store/actions/user'

export const ModalInputCode = ({visible,myClose,data,nextModal,disp}) => {


   
    const dispatch = useDispatch()
    const [inputCode,setInputCode] = useState('')
    console.log('Это наша дата' , data )
    function goAlert(text){

        Alert.alert(
            "Ошибка",
            text,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );

      }

    const arrPromo = ['HOLA','JOLN','GRGO','APRO','KPOB','JOKL','FODL','NIMO']

    const inputCheck = () => {

        if(inputCode.length != 4){
            goAlert('Промокод должен состоять из 4 символов')
        }else{
            if(data == 'Урок 2' && inputCode.toUpperCase() == arrPromo[0]){
                
                disp(data)
                myClose()
                nextModal()

            }else if (data == 'Урок 3' && inputCode.toUpperCase() == arrPromo[1]){
                disp(data)
                myClose()
                nextModal()
                console.log('Проходи 3')
            }
            else if (data == 'Урок 4' && inputCode.toUpperCase() == arrPromo[2]){
                disp(data)
                myClose()
                nextModal()
             
            }
            else if (data == 'Урок 5' && inputCode.toUpperCase() == arrPromo[3]){
                disp(data)
                myClose()
                nextModal()
               
            }
            else if (data == 'Урок 6' && inputCode.toUpperCase() == arrPromo[4]){
                disp(data)
                myClose()
                nextModal()
              
            }
            else if (data == 'Урок 7' && inputCode.toUpperCase() == arrPromo[5]){
                disp(data)
                myClose()
                nextModal()
               
            }
            else if (data == 'Урок 8' && inputCode.toUpperCase() == arrPromo[6]){
                disp(data)
                myClose()
                nextModal()
              
            }
            else if (data == 'Урок 9' && inputCode.toUpperCase() == arrPromo[7]){
                disp(data)
                myClose()
                nextModal()

            }
            else{
                // myClose()
                // nextModal()
                goAlert('Промокод неподходит')
            }
        }

    }


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
            <KeyboardAwareScrollView contentContainerStyle={{ height: windowHeight}}    keyboardShouldPersistTaps="always">
            <View style={styles.directContainer}>

                <View style={{...styles.shadow, height: sDisp()? 290 : 350}}>
                <View style={styles.textContainer}>
                <View style={styles.textPointWraper}><Text style={{...styles.textDefault,fontSize: sDisp() ? 18 : 25}}>Введите промокод для открытия повторения</Text></View>
                <View style={styles.textPointWraper}><Text style={{...styles.textDefault,fontSize: sDisp() ? 22 : 25}}>{data}</Text></View>
                <TextInput
              style={styles.input}
              placeholder='Код'
              placeholderTextColor="#A5A5A5"
              onChangeText={(text) => setInputCode(text)}
              value={inputCode.trim()}
              underlineColorAndroid="transparent"
              autoCapitalize="none"/>
                </View>
                </View>
<View style={styles.buttonContainer}>

            <TouchableOpacity onPress ={myClose} style={{ width: '40%' , }} >
                <Text style={{...styles.button,backgroundColor:'#9E8AE3'}}>
                    Назад
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress ={()=>{inputCheck()}} style={{ width: '40%'  }} >
                <Text style={styles.button}>
                   Ок
                </Text>
            </TouchableOpacity>

</View>
        
           
            </View>
            </KeyboardAwareScrollView>
        </Modal>

        )


    }
const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 60,
        borderWidth: 2,
        paddingHorizontal: 20,
        fontSize: 20,
        marginTop: 20,
        borderRadius: 40,
        borderColor: '#3A9FE7'
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 60,
      flexDirection: 'row',
      width: '80%'
    },
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
       marginTop: 5,
       flexDirection: "row"
   },
   textDefault: {
       fontSize: 25,
       textAlign: 'center',
       paddingHorizontal: '5%'
   },
   textPoint: {
       fontSize: 40,
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