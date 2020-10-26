import React from 'react'
import { createAppContainer, ThemeColors } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { RepeatScreen } from '../screens/RepeatScreen'
import { BaseScreen } from '../screens/BaseScreen'
import { RatingScreen } from '../screens/RatingScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { THEME } from '../theme'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { WordRepeatScreen } from '../screens/WordRepeatScreen'



const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
  }
}


const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Repeat:  RepeatScreen,
    Base: BaseScreen,
    Rating: RatingScreen,
    Profile: ProfileScreen

  },
  navigatorOptions
)

const MainNavigator = createStackNavigator(
  {
    Main: MainScreen
  },
  navigatorOptions
)


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

// const BookedNavigator = createStackNavigator(
//   {
//     Booked: BookScreen,
//     Post: PostScreen
//   },
//   navigatorOptions
  
// )


const bottomTabsConfig = {
  Repeat: {
    screen: RepeatNavigator,
    navigationOptions: {
      tabBarLabel: 'Повторения',
      tabBarIcon: info => (
        <Ionicons name='ios-albums' size={25} color={info.tintColor} />
      )
    }
  },
  Base: {
    screen: BaseNavigator,
    navigationOptions: {
      tabBarLabel: 'База знаний',
      tabBarIcon: info => (
        <Ionicons name='ios-star' size={25} color={info.tintColor} />
      )
    }
  }
  ,
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      tabBarLabel: 'Главная',
      tabBarIcon: info => (
        <Ionicons name='ios-star' size={25} color={info.tintColor} />
      )
    }
  },
  Rating: {
    screen: RatingNavigator,
    navigationOptions: {
      tabBarLabel: 'Рэйтинг',
      tabBarIcon: info => (
        <Ionicons name='ios-star' size={25} color={info.tintColor} />
      )
    }
  }
  ,
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Мой профиль',
      tabBarIcon: info => (
        <Ionicons name='ios-star' size={25} color={info.tintColor} />
      )
    }
  }


}
const BottomNavigator = Platform.OS === 'android' 
?  createMaterialBottomTabNavigator(bottomTabsConfig, {
  initialRouteName: 'Main',
  shifting: true,
activeTintColor: '#fff',
barStyle: {
  backgroundColor : THEME.MAIN_COLOR
}
}) : createBottomTabNavigator (bottomTabsConfig,{
  initialRouteName: 'Main',
  tabBarOptions: {
    activeTintColor: THEME.MAIN_COLOR
  }
})


const MainNavigators = createDrawerNavigator ({
  Main: {
    screen: BottomNavigator,
    navigationOptions: {
      drawerLabel: 'Главная'
    }
  },
  Repeat:{
    screen: RepeatNavigator,
    navigationOptions: {
      drawerLabel: 'Повторения'
    }
  } ,
  Base: {
    screen: BaseNavigator,
    navigationOptions: {
      drawerLabel: 'База знаний'
    }
  } ,
  Rating: {
    screen: RatingNavigator,
    navigationOptions: {
      drawerLabel: 'Рэйтинг'
    }
  } ,
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      drawerLabel: 'Мой профиль'
    }
  } 
},
{
  contentOptions: {
    activeTintColor: THEME.MAIN_COLOR
    // ,
    // labelStyle: {
    //   fontFamily: 'open-bold'
    // }
  }
}
)
  

export const AppNavigation = createAppContainer(MainNavigators)
