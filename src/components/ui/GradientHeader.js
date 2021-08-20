import React from 'react'
import {StyleSheet, View,Image} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { Header} from 'react-navigation-stack'


export const GradientHeader = props => (
    <View style={{border: 'none',  borderColor: 'transparent',height: 86,borderBottomWidth: 1, borderBottomColor: '#e1e1e1',alignItems: 'flex-start',
    alignContent: 'center',justifyContent: 'flex-end',backgroundColor: '#fff',}} >

          {/* <Header style={{  borderColor: 'transparent',height: 90}} {...props} /> */}
          
          <Image  style={{width: '55%',height: 40,marginLeft: '5%',marginBottom: 11}}
        source={require('../../../assets/img/hLogo.png')}>

        </Image>
      </View>
    )