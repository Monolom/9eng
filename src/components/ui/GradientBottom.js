import React from 'react'
import { View} from 'react-native'
import {BottomTabBar } from 'react-navigation-tabs'


export const GradientBottom = props => (

<View style={{    backgroundColor: '#fff',borderTopWidth: 1, borderTopColor: '#e1e1e1',width: '100%',justifyContent: 'center',alignContent:'center',alignItems: 'center',position:'relative'}}>
 
 <BottomTabBar {...props} style={{
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingTop: 10,
    height: 72, 
    backgroundColor: '#fff', 
    borderTopColor: '#fff',
    width: '90%',
    marginTop: 2
 
  }}/> 

</View>

)