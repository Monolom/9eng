import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Button,Text,StyleSheet} from 'react-native'
// import {DATA} from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { THEME } from '../theme'
import * as firebase from 'firebase';



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
return (
  <View  style={styles.wraper}>

      <TouchableOpacity onPress =  {goToRepeat}><Text style={styles.button}>Повторение</Text></TouchableOpacity>
      <TouchableOpacity onPress =  {goToBase}><Text style={styles.button}>База знаний</Text></TouchableOpacity>
      <TouchableOpacity onPress =  {goToRating}><Text style={styles.button}>Рэйтнг</Text></TouchableOpacity>
      <TouchableOpacity onPress =  {goToProfile}><Text style={styles.button}>Мой профиль</Text></TouchableOpacity>
      <TouchableOpacity onPress =  {()=>{firebase.auth().signOut()}}><Text style={styles.button}>Разлог</Text></TouchableOpacity>
      
  </View>
)
}

MainScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Главная' ,

     headerLeft: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
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
        alignItems: 'center'
    },
    button: {
    marginBottom: 30,
    backgroundColor: THEME.MAIN_COLOR,
    color: '#fff',
    width: 200,
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5
    }
})

