import React, {useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,FlatList ,Dimensions,Clipboard,Linking} from 'react-native'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {loadTicher} from '../store/actions/ticher'
import {loadUser} from '../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { color } from 'react-native-reanimated'
import { THEME } from '../theme'
import {firebase} from '../firebase/config'
import { statUser } from '../store/actions/stat'
import {LogautModal} from '../components/ui/LogautModal'
import NetInfo from '@react-native-community/netinfo'
import {Ionicons,FontAwesome5} from '@expo/vector-icons'
// import Clipboard from '@react-native-community/clipboard';



export const ProfileScreen = ({navigation}) => {

    let  userUid = firebase.auth().currentUser.uid
  let userEmail = firebase.auth().currentUser.email

    const dispatch = useDispatch()
    
    useEffect(() => {

        dispatch(statUser())

     }, [dispatch])

     useEffect(() => {

        dispatch(loadUser())

     }, [dispatch])

     

    const allStat = useSelector(state => state.stat.statUser)

    const allStatArr = Object.values(allStat) 

    const allUser = useSelector( state => state.user.allUser ) 

    const allStatArrPoint = Object.values(allUser) 

    const [logModal,setLogModal] = useState(false)
    

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


      const windowWidth = Dimensions.get('window').width;
      const windowHeight = Dimensions.get('window').height;
  
      const sDisp = () => {
  
        if(windowHeight < 620){
          return true
        }else{
          return false
        }
        
      }

    // const chengeSimbol = (string) => {
    //   const simbol = +string[string.length - 1] + 1
    //   return string.substring(0, string.length - 1) + String(simbol)
      
    //  }

    // console.log('мой пользователь',allUser.point)

    // const checkModalList = (arr) => {

    //   const myArr= arr
    //   let result = false


    // arr.forEach(function(item, i, arr) {
    //   if(item.code !== 0){
    //     result = true
    //   }
    //   });

    //   return result
    // }


    // const  openPostHandler = post => {

    //     navigation.navigate( 'Post', {postId: post.id, date: post.date,booked: post.booked } )

    // } 
    // let userEmail = false

    async function getInfo(){

      const eventref = firebase.database().ref('users').child(userUid).child('email')

     await eventref.once('value',(snapshots)=>{
      userEmail =  snapshots.val()
     })

    //  return snapshot.val()

      // console.log('длина',  userEmail.length)

    }
    // getInfo()
    // console.log('Привет',getInfo())
    
    
    const levelGraber = () => {
      return Math.floor(indexUsre.point/100) 
    }

    const  closeModal = () => {
      setLogModal(false)
    }

// console.log('Привет', indexUsre.fullName )

NetInfo.addEventListener(state => {
  console.log('Connection type', state.isInternetReachable);
});

// indexUsre == undefined

if ( indexUsre === undefined){

  console.log('портер', indexUsre)

  return (
    <View style={styles.loadingContainer}>

<ActivityIndicator size="large" color="#3A9FE7"  />  

</View>
  )

}


else {

  let counterPhrase = 0
  let  arrPhrase = []
  for(key in allUser.access){

      if(allUser.access){
        arrPhrase.push({title:key,id:counterPhrase,code: allUser.access[key]})
        counterPhrase++
      }else{
        arrPhrase.push({title:key,id:counterPhrase,code: allUser.access[key]})
        counterPhrase++
      }
  }

  
 
return (


<View style={styles.truDirectWraper}>

  <Image style={styles.imgHead} source={require("../../assets/img/profile.png")}>

  </Image>
  <View style={styles.profileBlock} > 
  <Text style={styles.preEmail}>e-mail</Text>
  <Text style={styles.textEmail}>{userEmail}</Text>
  <TouchableOpacity onPress={()=>setLogModal(true)}>
  <Text style={styles.textEmailExit}>выйти из аккаунта</Text>
  </TouchableOpacity>
 
  </View>

  <View style={styles.supprtBlock} > 
  <Text style={{...styles.preEmail,marginBottom: 0}}>техническая поддержка</Text>
  <Text style={styles.textEmailSupport}>support@supereng.ru</Text>
  
  <View style={styles.rIconWraper}> 

<TouchableOpacity  onPress={() => Linking.openURL('http://google.com')} >


<FontAwesome5 name="telegram-plane" size={30} color="#a0a0a0" />
</TouchableOpacity>
<TouchableOpacity  onPress={() => Linking.openURL('http://google.com')} >
<FontAwesome5 name="whatsapp" size={30} color="#a0a0a0" />
</TouchableOpacity>

</View>
  </View>


  <LogautModal   visible={logModal} myClose={closeModal}   />
  {/* 


    <TouchableOpacity onPress =  {()=>setLogModal(true)}><Text style={styles.button}>Выйти с аккаунта</Text></TouchableOpacity> */}

    </View>

)
}
}

ProfileScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Мой профиль' ,

    headerRight: () => ( 
    
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
  
      <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
  
   </HeaderButtons>)
})



const styles = StyleSheet.create({
  supprtBlock: {
    alignItems: 'center',
    paddingBottom: 20
  },
  profileBlock:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 20  },
  preEmail: {
    fontFamily: 'sf-regular',
    color: '#a0a0a0',
    marginBottom: 5
  },
  textEmail: {
    fontFamily: 'sf-regular',
    marginBottom: 5,
    color: '#000'
  },
  textEmailExit: {
    fontFamily: 'sf-regular',
    color: '#0b1c8c'
  },
  rIconWraper : {
    flexDirection: 'row',
    marginTop: 5,
    width: 70,
    justifyContent: 'space-between'
},
imgHead: {
  width: '60%',
  height: 220,
  marginTop: 15
},


directWraper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: "space-between",
   
 
},
itemWraper: {
   
},
label: {
    fontSize: 18,
    color: '#000'
},
lineG: {
  width: '100%',
  height: 2,
  backgroundColor: '#DEDEDE',
  marginVertical: 20
},
value: {
    fontSize: 28,
    color: "#7F7F7F",
    textAlign: "right"
},
levelWraper: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'flex-start',
    justifyContent: "space-between",
    flexDirection: "row",
   
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
  fontSize: 18,
    color: '#000'
},
levelText: {
fontSize: 32,
marginLeft: 20,
color: "#3A9FE7",

},
button: {
  color: "#fff",
  backgroundColor: '#3A9FE7',
  paddingVertical: 10,
  paddingHorizontal: 40,
  minWidth: '65%',
  fontSize: 20,
  marginTop: 15,
  textAlign: 'center',
  borderRadius: 25,
  marginBottom: 20,
  overflow: 'hidden'
  },
  truDirectWraper: {
    justifyContent: "space-between",
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff'

  },
  cardContainer: {
     shadowColor: "#DCCAFF",
        shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.9,
      shadowRadius: 8,
      elevation: 6,
    width: '90%',
    borderRadius: 25,
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 15
  },
  loadingContainer: {
    height: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 1
},
promoContainer :{
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: "row",
  alignItems: 'center',
  borderBottomColor: '#DEDEDE',
  borderBottomWidth: 2,
  paddingBottom: 5,

 
},

promoTitle: {
  display: 'flex',
 
  fontSize: 25,
  color: "#7F7F7F"
},

promoCode: {
  fontSize: 25,
  color: "#3A9FE7",
}

})