//Импорт React
import React from 'react'
//Импорт модуля React Native
import {View} from 'react-native'
// Импорт react-navigation
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// импорт иконок
import {FontAwesome5} from '@expo/vector-icons'
//импорт экранов
import { RepeatScreen } from '../screens/RepeatScreen'
import { BaseScreen } from '../screens/BaseScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
//импорт модальных окон
import {DialogModal} from '../components/ui/DialogModal'
import {WordModal} from '../components/ui/WordModal'
//импорт кастомных решений меню
import {GradientHeader} from '../components/ui/GradientHeader'
import {GradientBottom} from '../components/ui/GradientBottom'
import {NavigtionIcon} from '../components/ui/NavigationIcon'





// общие настройки
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

  }
}


// оборачивае экраны
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


const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  navigatorOptions
)



// Создаём конфиг для нижнего меню
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

// создаём нижнее меню
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


// создаём общие пространство в которое входит основной экран (с нижнем меню) и два модальных окна  
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
