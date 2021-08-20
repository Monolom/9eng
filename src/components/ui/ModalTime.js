import React, {useState} from 'react'
import {View,StyleSheet,TextInput,Button,Modal,Text,TouchableOpacity,Platform} from 'react-native'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'
import { block } from 'react-native-reanimated'
import {LinearGradient} from 'expo-linear-gradient'

export const ModalTime = ({visible,press,time}) => {
    let firstDay = ''
    let LastDay = ""
    const getDay = () => {
        if(millisecToTimeStruct(time).d <= 99){
           firstDay = millisecToTimeStruct(time).d.toString()[0]
           LastDay = millisecToTimeStruct(time).d.toString()[1]
        }
        else {
            firstDay = '9'
            LastDay = '9'
        }
    }

    getDay()

console.log('день', millisecToTimeStruct(time).d.toString())
console.log('час', millisecToTimeStruct(time).h.toString())
console.log('минут', millisecToTimeStruct(time).m.toString())
console.log('секунд', millisecToTimeStruct(time).s.toString().length)

    return (

        <Modal animationType='slide' visible={visible} transparent={false}>
                <View style={styles.direcWraper}>



                    <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: "column",
                    width: '100%',
                    }}>

                    <View style={styles.shadow}>
                    <Text  style={styles.title}>
                        Повторение  
                    </Text>
                    <Text style={{...styles.title,marginBottom: 30}}>
                    пока недоступно
                    </Text>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeItem}>
                            <View style={styles.timeCardWrap}>
                <Text style={styles.timeCard}>
                    {millisecToTimeStruct(time).d.toString().length == 3 ? 9 : millisecToTimeStruct(time).d.toString().length == 2?  millisecToTimeStruct(time).d.toString()[0] : '0'  }
                    </Text>
                                <Text  style={styles.timeCard}>
                                {millisecToTimeStruct(time).d.toString().length == 3 ? 9 : millisecToTimeStruct(time).d.toString().length == 2?  millisecToTimeStruct(time).d.toString()[1] : millisecToTimeStruct(time).d.toString()[0]  }
                                    </Text>
                            </View>
                            <Text style={styles.cardTittle}>Дней</Text>
                        </View>
                        <View style={styles.timeItem}>
                            <View style={styles.timeCardWrap}>
                                <Text style={styles.timeCard}>
                                    {millisecToTimeStruct(time).h.toString().length == 2 ? millisecToTimeStruct(time).h.toString()[0] : '0' }
                                    </Text>
                                <Text  style={styles.timeCard}>
                                    {millisecToTimeStruct(time).h.toString().length == 2 ? millisecToTimeStruct(time).h.toString()[1] :  millisecToTimeStruct(time).h.toString()[0] }
                                    </Text>
                            </View>
                            <Text style={styles.cardTittle}>Часов</Text>
                        </View>
                        <View style={styles.timeItem}>
                            <View style={styles.timeCardWrap}>
                                <Text style={styles.timeCard}>
                                   { millisecToTimeStruct(time).m.toString().length == 2 ? millisecToTimeStruct(time).m.toString()[0] : '0' }
                                    </Text>
                                <Text  style={styles.timeCard}>
                                {millisecToTimeStruct(time).m.toString().length == 2 ? millisecToTimeStruct(time).m.toString()[1] :  millisecToTimeStruct(time).m.toString()[0] }
                                    </Text>
                            </View>
                            <Text style={styles.cardTittle}>Минут</Text>
                        </View>
                        <View style={styles.timeItem}>
                            <View style={styles.timeCardWrap}>
                                <Text style={styles.timeCard}>
                                    {millisecToTimeStruct(time).s.toString().length == 2 ? millisecToTimeStruct(time).s.toString()[0] : '0'}
                                    </Text>
                                <Text  style={styles.timeCard}>
                                {millisecToTimeStruct(time).s.toString().length == 2 ? millisecToTimeStruct(time).s.toString()[1] :  millisecToTimeStruct(time).s.toString()[0] }
                                    </Text>
                            </View>
                            <Text style={styles.cardTittle}>Секунд</Text>
                        </View>
                    </View>
                    </View>

                    <TouchableOpacity onPress={press} style={{width: '40%',marginTop: 60}} >
                    <Text style={styles.button}> Ок</Text>
                    </TouchableOpacity>

                    </View>

      </View>
        </Modal>

        )
    
}
const styles = StyleSheet.create({
    title: {
        color: '#282727',
        fontSize: 35
    },
    direcWraper: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: "column",
        flex: 1,
        backgroundColor: '#fff'
    },
    shadow : {
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
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: "column",
     
    },
    button:{
        minWidth: '100%',
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#fff',
        backgroundColor: "#3A9FE7",
        borderRadius: 20,overflow: 'hidden'
    
       },
       timeContainer: {
           flexDirection: 'row',
           

       },
       timeCardWrap: {
           flexDirection: 'row'
       },
       timeCard: {
           fontSize: 24,
           paddingHorizontal: 8,
           paddingVertical: 4,
           backgroundColor: "#3A9FE7",
           color: '#fff',
           marginHorizontal: 2,
           borderRadius: 5,
       },
       timeItem : {
           alignItems: 'center',
           marginHorizontal: 4
       },
       cardTittle: {
           color: "#787878"
       }
       


})