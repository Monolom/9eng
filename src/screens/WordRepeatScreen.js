import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Text,StyleSheet} from 'react-native'
// import {DATA} from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
// import { Postlist } from '../components/PostList'


export const WordRepeatScreen = ({navigation}) => {

    const  openPostHandler = post => {

        navigation.navigate( 'Post', {postId: post.id, date: post.date,booked: post.booked } )

    }   
return (
  <View>
    <Text>Повторение слов</Text>
  </View>
)
}

WordRepeatScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Рэйтинг' ,
   
     headerLeft: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
     <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    
 </HeaderButtons>)
})



const styles = StyleSheet.create({
    wraper: {
        padding: 15
    }
})