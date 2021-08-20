import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Button,Text,StyleSheet,Dimensions} from 'react-native'
// import {DATA} from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { THEME } from '../theme'
import * as firebase from 'firebase'
import {LinearGradient} from 'expo-linear-gradient'
import {Ionicons} from '@expo/vector-icons'


export const MainScreen = ({navigation}) => {


    const goToRepeat = () => {
         navigation.navigate('Repeat')
    }
    const goToMain = () => {
        navigation.navigate('Main')
    }
    const goToBase = () => {
        navigation.navigate('Base')
    }
    const goToRating = () => {
        navigation.navigate('Rating')
    }
    const goToProfile = () => {
        navigation.navigate('Profile')
    }
    const  openPostHandler = post => {

        navigation.navigate( 'Post', {postId: post.id, date: post.date,booked: post.booked } )

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
  <View  style={styles.wraper}>
              
      <TouchableOpacity onPress =  {goToRepeat} style={styles.button}>
          <View style={styles.wraperB}>
          
    
               <Text style={{...styles.buttonText,fontSize: sDisp() ? 16: 18}}>Повторение</Text>
               <View style={{...styles.icon, top: 12}}><Ionicons name={"md-refresh"} size={sDisp() ? 25:35} color="#fff" /></View>
               </View>
               </TouchableOpacity>

      <TouchableOpacity onPress =  {goToBase} style={styles.button}>
 
      
          <View style={styles.wraperB}>
          
    
          <Text style={{...styles.buttonText,fontSize: sDisp() ? 16: 18}}>База знаний</Text>
          <View style={{...styles.icon, top: 12}}><Ionicons name={"ios-school"} size={sDisp() ? 25:35} color="#fff" /></View>
          </View>
          </TouchableOpacity>
      <TouchableOpacity onPress =  {goToRating} style={styles.button}>
      <View style={styles.wraperB}>
          
    
      <Text style={{...styles.buttonText,fontSize: sDisp() ? 16: 18}}>Рэйтнг</Text>
          <View style={{...styles.icon, top: 12}}><Ionicons name={"ios-ribbon"} size={sDisp() ? 25:35} color="#fff" /></View>
          </View>
         
      
          </TouchableOpacity>
      <TouchableOpacity onPress =  {goToProfile} style={styles.button}>
      <View style={styles.wraperB}>
          
    
      <Text style={{...styles.buttonText,fontSize: sDisp() ? 16: 18}}>Мой профиль</Text>

    <View style={{...styles.icon, top: 12}}><Ionicons name={"md-person"} size={sDisp() ? 25:35} color="#fff" /></View>

              </View>
         
 
          </TouchableOpacity>
   
      
  </View>
)
}

MainScreen.navigationOptions = ( {navigation}) => ({

    headerTitle:  'Главная' ,

    headerRight: () => ( 
    
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>

    <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    
    </HeaderButtons>)
 
})



const styles = StyleSheet.create({
    wraper: {
        padding: 15,
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    button: {
        borderRadius: 60,
        overflow: 'hidden',
        minWidth: '70%',
        marginVertical: 0,
        marginHorizontal: 'auto',
        marginBottom: 20,
        position: 'relative',

    },
    buttonText: {
        backgroundColor: '#3B9FE8',
        color: '#fff',
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 15,
        fontFamily: 'open-regular',
        textTransform: "uppercase"
  
    },
    

    wraperB: {
        position: 'relative',

    },
    icon: {
        position: "absolute",
        left: 15,
        top: 8,
    },
    phraButtonCenter: {
        flexDirection: 'row'
    }
    
   
})

