import React, {useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {loadTicher} from '../store/actions/ticher'
import {loadUser} from '../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { color } from 'react-native-reanimated'
import { THEME } from '../theme'
import {firebase} from '../firebase/config'
import { statUser } from '../store/actions/stat'




export const ProfileScreen = ({navigation}) => {

    let  userUid = firebase.auth().currentUser.uid

    const dispatch = useDispatch()
    
    useEffect(() => {

        dispatch(statUser())


     }, [dispatch])

     useEffect(() => {

        dispatch(loadUser())

     }, [dispatch])

     

    const allStat = useSelector(state => state.stat.statUser)

    const allStatArr = Object.values(allStat) 

    const allUser = useSelector(state => state.user.allUser)

    const allStatArrPoint = Object.values(allUser) 

    const indexUsre = allStatArr.find(function(item,index,array){
        if(item.id === userUid){
          return true
        }
      })

      
    const indexUsrePoint = allStatArrPoint.find(function(item,index,array){
        if(item.id === userUid){
          return true
        }
      })

    console.log('мой пользователь',allUser)

    const  openPostHandler = post => {

        navigation.navigate( 'Post', {postId: post.id, date: post.date,booked: post.booked } )

    } 
    
    // async function getInfo(){
    //   const eventref = firebase.database().ref('usersData').child(userUid).child('point')
    // const snapshot = await eventref.once('value')
    // console.log('Явись баг', snapshot)
    // }

    // getInfo()
      const levelGraber = () => {
        return Math.floor(allUser.point/100) 
      }



return (

<View style={styles.truDirectWraper}>


    <View>
<View style={styles.directWraper}>
      <View style={styles.itemWraper}>
    <Text style={styles.label}>Имя</Text>
<Text style={styles.value}> {indexUsre.fullName}</Text>
    </View>
    <View style={styles.itemWraper}>
    <Text style={styles.label}>Баллы</Text>
<Text style={styles.value}>{allUser.point}</Text>
    </View>

 

  </View>
  <View style={styles.levelWraper}>
        <View style={styles.levelWraperPoint}>
            <Text style={styles.levelPoint}>
                {levelGraber()}
            </Text>
        </View>
        <Text style={styles.levelText} >
                Уровень
                </Text>
    </View>

    </View>

    <TouchableOpacity onPress =  {()=>{firebase.auth().signOut()}}><Text style={styles.button}>Разлог</Text></TouchableOpacity>

    </View>

)
}

ProfileScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Мой профиль' ,

     headerLeft: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
     <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    
 </HeaderButtons>)
})



const styles = StyleSheet.create({
directWraper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 40
},
itemWraper: {
    marginRight: 40
},
label: {
    fontSize: 24,
    color: '#636363'
},
value: {
    fontSize: 20,
    color: THEME.AKCENT_COLOR
},
levelWraper: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginTop: 40
},
levelWraperPoint: {
    borderWidth: 2,
    width: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: THEME.AKCENT_COLOR
},
levelPoint:{
    fontSize: 35,
    color: THEME.AKCENT_COLOR

},
levelText: {
fontSize: 30,
marginLeft: 20,
color: THEME.AKCENT_COLOR,

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
  },
  truDirectWraper: {
    justifyContent: "space-between",
    alignItems: 'center',
    height: '100%'

  }
})