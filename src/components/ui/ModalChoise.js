import React, {useState} from 'react'
import {View,StyleSheet,TextInput,Button,Modal,Text} from 'react-native'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'
import { block } from 'react-native-reanimated'

export const ModalChoise = ({navigation,visible,Press,data,CloseModal,openWord,openPhrase,modalInfo}) => {

const goToWord = () => {
    navigation.navigate('WordRepeat')
    CloseModal()
}

   
    if(!data.phrase & !data.word){
        return (

            <Modal animationType='slide' visible={visible} transparent={false}>
            <View style={styles.header} >
                <Text style={styles.headerLeson}>{modalInfo.tich}</Text>
                <Text style={styles.headerText}>Повторение  <Text style={styles.headerTextAkcent}>{modalInfo.index}</Text></Text>
            </View>
            <View style={styles.buttonWrap}>
            <AppButton style={styles.button} children={"Повторять слова"} onPress={openWord} />
            <AppButton  children={"Повторять фразы"} onPress={openPhrase} />
            <AppButton  children={"Назад"} onPress={Press}/>
            </View>
            </Modal>
    
            )
    }
    if(!data.phrase & data.word){
        return (

            <Modal animationType='slide' visible={visible} transparent={false}>
            <View style={styles.header} >
                <Text style={styles.headerLeson}>{modalInfo.tich}</Text>
                <Text style={styles.headerText}>Повторение  <Text style={styles.headerTextAkcent}>{modalInfo.index}</Text></Text>
            </View>
            <View style={styles.buttonWrap}>
            
            <AppButton  children={"Повторять фразы"} onPress={openPhrase} />

            <AppButton  children={"Назад"} onPress={Press}/>
            </View>
            </Modal>
    
            )
    }
    if(data.phrase & !data.word){
        return (

            <Modal animationType='slide' visible={visible} transparent={false}>
            <View style={styles.header} >
                <Text style={styles.headerLeson}>{modalInfo.tich}</Text>
                <Text style={styles.headerText}>Повторение  <Text style={styles.headerTextAkcent}>{modalInfo.index}</Text></Text>
            </View>
            <View style={styles.buttonWrap}>
            <AppButton style={styles.button} children={"Повторять слова"} onPress={openWord} />
            
            <AppButton  children={"Назад"} onPress={Press}/>
            </View>
            </Modal>
    
            )
    }

    return (

        <Modal animationType='slide' visible={visible} transparent={false}>
        <View style={styles.header} >
            <Text style={styles.headerLeson}>{modalInfo.tich}</Text>
            <Text style={styles.headerText}>Повторение  <Text style={styles.headerTextAkcent}>{modalInfo.index}</Text></Text>
        </View>
        <View style={styles.buttonWrap}>
        <AppButton style={styles.button} children={"Повторять слова"} onPress={Press} />
        <AppButton  children={"Повторять фразы"} onPress={Press} />
        <AppButton  children={"Назад"} onPress={Press}/>
        </View>
        </Modal>

        )
    
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: THEME.BACK_GROUND,
        color: '#fff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerLeson: {
        fontSize: 24
    },
    headerText: {
        fontSize: 20
    },
    headerTextAkcent: {
        fontSize: 24,
        color: THEME.AKCENT_COLOR,
        paddingLeft: 10
    },
    buttonWrap: {
      flex: 1,
      height: '100%',
      width: '100%',
      alignItems: "center",
      alignContent: "center",
      justifyContent: 'center'
    }

})