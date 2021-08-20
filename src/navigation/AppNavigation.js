import React from 'react'
import {View,StyleSheet,Header,Text,Image} from 'react-native'
import { createAppContainer, ThemeColors } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator , BottomTabBar } from 'react-navigation-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons,FontAwesome5 , MaterialCommunityIcons} from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { RepeatScreen } from '../screens/RepeatScreen'
import { BaseScreen } from '../screens/BaseScreen'
import { RatingScreen } from '../screens/RatingScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { THEME } from '../theme'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { WordRepeatScreen } from '../screens/WordRepeatScreen'
import {LinearGradient} from 'expo-linear-gradient'
import {GradientHeader} from '../components/ui/GradientHeader'
import * as Font from 'expo-font'
import {GradientBottom} from '../components/ui/GradientBottom'
import {NavigtionIcon} from '../components/ui/NavigationIcon'
import {NewModalTest} from '../components/ui/NavModalTest'
import {WordModal} from '../components/ui/WordModal'
import {DialogModal} from '../components/ui/DialogModal'





const navigatorOptions = {
  
  defaultNavigationOptions: {
    header: props => <GradientHeader {...props} />,
    headerStyle: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
      elevation: 0,
      height: 90
     
    },
    
    headerTintColor: '#fff' ,
    headerTitleStyle: {
      fontFamily: 'open-regular',
      fontSize: 25
    },
    headerTitleAlign: 'left',
    mode: 'card',
    labelStyle: {
      leterSpasing: 22,
      fontSize: 20
    }
    // headerBackground: 'transparent'
    // headerTransparent: true
  }
}



const RepeatNavigator = createStackNavigator(
  {
    Repeat: RepeatScreen
  },
  navigatorOptions
)


const BaseNavigator = createStackNavigator(
  {
    Base: BaseScreen
  },
  navigatorOptions
)
const RatingNavigator = createStackNavigator(
  {
    Rating: RatingScreen
  },
  navigatorOptions
)
const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  navigatorOptions
)




const bottomTabsConfig = {
  Base: {
    screen: BaseNavigator,
    navigationOptions: {
      tabBarLabel: 'база знаний',
      tabBarIcon: info => (
        <View style={{marginTop: 1}}>
 <FontAwesome5 name='home' size={31} color={info.tintColor} />
        </View>
       
     
      )
    }
  }
  ,

  Repeat: {
    screen: RepeatNavigator,
    navigationOptions: {
      tabBarLabel: 'повторения',
      tabBarIcon: info => (
      <NavigtionIcon info={info}></NavigtionIcon>
    
      )
    }
  },

  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'профиль',
    
      tabBarIcon: info => (


            <FontAwesome5 name="user-alt" size={28} color={info.tintColor} />
  
      )
    }
  }


}
const BottomNavigator = createBottomTabNavigator (bottomTabsConfig,{

  tabBarComponent: props => <GradientBottom {...props} />
,
  initialRouteName: 'Repeat', 
  tabBarOptions: {
    activeTintColor: '#e10918',
    style: {
    backgroundColor : '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    height: 60,
    },
    inactiveTintColor: '#a0a0a0',
    showLabel: true,
   labelStyle: {
      fontFamily: 'circe-regular',
      letterSpacing: 0.3
    },
  },
  
})

// createMaterialBottomTabNavigator(bottomTabsConfig, {
//   initialRouteName: 'Main',
//   shifting: true,
//   labeled: false,
// activeTintColor: '#fff',
// barStyle: {
//   backgroundColor : THEME.MAIN_COLOR,
//   paddingBottom: 10,
//   paddingTop: 10
// }
// })  

// createBottomTabNavigator (bottomTabsConfig,{
//   initialRouteName: 'Main',
//   tabBarOptions: {
//     activeTintColor: THEME.MAIN_COLOR
//   }
// })


// const MainNavigators = createDrawerNavigator ({
//   Main: {
//     screen: BottomNavigator,
//     navigationOptions: {
//       drawerLabel: 'Главная'
//     }
//   },
//   Repeat:{
//     screen: RepeatNavigator,
//     navigationOptions: {
//       drawerLabel: 'Повторения'
//     }
//   } ,
//   Base: {
//     screen: BaseNavigator,
//     navigationOptions: {
//       drawerLabel: 'База знаний'
//     }
//   } ,
//   Rating: {
//     screen: RatingNavigator,
//     navigationOptions: {
//       drawerLabel: 'Рэйтинг'
//     }
//   } ,
//   Profile: {
//     screen: ProfileNavigator,
//     navigationOptions: {
//       drawerLabel: 'Мой профиль'
//     }
//   } 
// },


// {
//   contentOptions: {
//     activeTintColor: THEME.MAIN_COLOR,
//     labelStyle: {
//       fontFamily: 'open-bold'
//     }
//   },
//   drawerPosition: "right"
// }
// )
  
const RootNavigator = createStackNavigator({
  Main: {
    screen: BottomNavigator
  },
  MyModal: {
    screen: WordModal,
  },
  DialogModal: {
    screen: DialogModal
  }
},
{
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    gestureEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  })
})
export const AppNavigation = createAppContainer(RootNavigator)
