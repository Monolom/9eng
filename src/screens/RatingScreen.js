import React,{useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Dimensions,Platform,ActivityIndicator} from 'react-native'
// import {DATA} from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
// import { Postlist } from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { statUser } from '../store/actions/stat'
import {firebase} from '../firebase/config'
import { ceil, color } from 'react-native-reanimated'
import { THEME } from '../theme'


export const RatingScreen = ({navigation}) => {

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


    const largeName = (name) => {

      if(name.length > 14){
        return name.substr(0,13) + '...'
      }else{
        return name
      }

    } 
    
    let  userUid = firebase.auth().currentUser.uid
     
    const [tabState,setTabState] =  useState(false)
    
    const dispatch = useDispatch()
    
    useEffect(() => {

         dispatch(statUser())

      }, [dispatch])


    //   useEffect(() => {

    //     dispatch(loadUser())

    //  }, [dispatch])

     const allUser = useSelector( state => state.user.allUser ) 
     
      useEffect(() => {

        dispatch(statUser())

     }, [allUser])

    //   useEffect(() => {

    //     dispatch(statUser())

    //    //  setLoadData(true)
    //  }, [])



const allStat = useSelector(state => state.stat.statUser)
const allStatArr = Object.values(allStat)

const statTop = allStatArr.sort((a,b) => {
  var c = a.point,
  d = b.point;
if( c < d ){
  return 1 ;
}else if( c > d ){
  return -1;
}

return 0;

})

const indexUsre = statTop.findIndex(function(item,index,array){
  if(item.id === userUid){
    return true
  }
})


 


console.log(
'Кака',indexUsre
)

console.log(
  'Кака2',statTop
  )



if (!statTop[0] ){
  return (

    <View style={styles.loadingContainer}>

<ActivityIndicator size="large" color="#3A9FE7"  />  

</View>

  )
}else{
if(!tabState){
  return (

    <View style={styles.truDirectWraper}>
    <View style={styles.directWraper}>
    
      <View style={{...styles.flatWraper, height: sDisp() ? 280 :  windowHeight < 750 ? 380 : 500 }}>
      <FlatList  showsVerticalScrollIndicator={false}  keyExtractor={post => post.id.toString() }  data={statTop.slice(0,10) } 
  renderItem={({item,index}) => ( 
  
      <View style={styles.listItemWraper}>
  
      <Text style={{...styles.number,backgroundColor: '#3A9FE7',fontSize: sDisp() ? 14 : 20,minHeight: sDisp()?30:40,minWidth: sDisp()?30:40}}>
       {index + 1}
      </Text>
    <View style={styles.lineWraper}>

    <Text style={{...styles.name, fontSize: sDisp() ? 18 : 20}}>
     {largeName(item.fullName)}
    </Text>
    
    <Text style={{...styles.point,fontSize: sDisp() ? 18 : 20}}>
    {item.point}
    </Text>

    </View>
   
    
    </View>
  
  
    )}/>
  

    </View>
    <View style={styles.buttonWraper}>
            
            <TouchableOpacity style={{width: '40%'}}  onPress={()=>{setTabState(false)}}>
  
              <Text style={{...styles.button,fontSize: sDisp() ? 16 : 18}}>
              Топ
              </Text>
            
            </TouchableOpacity>
                
            <TouchableOpacity style={{width: '40%'}}  onPress={()=>{setTabState(true)}}>
           <Text style={{...styles.button,fontSize: sDisp() ? 16 : 18}}>
           Где я?
           </Text>
        
            </TouchableOpacity>
  
        </View>



    

    </View>
    </View>
  )
}else{
  return (

    <View style={styles.truDirectWraper}>
      
    <View style={styles.directWraper}>
    
      <View style={{...styles.flatWraper,height: sDisp() ? 280 :  windowHeight < 750 ? 380 : 500 }}>
      <FlatList  showsVerticalScrollIndicator={false}  keyExtractor={post => post.id.toString() }  data={ statTop.slice(indexUsre,indexUsre+10)} 
  renderItem={({item,index}) => ( 
  
      <View style={styles.listItemWraper}>
  
      <Text style={{...styles.number,backgroundColor: index == 0 ? "#9E8AE3" : '#3A9FE7',fontSize: sDisp() ? 14 : 20,minHeight: sDisp()?30:40,minWidth: sDisp()?30:40}}>
       {indexUsre + index + 1}
      </Text>
    <View style={styles.lineWraper}>

    <Text style={{...styles.name, fontSize: sDisp() ? 18 : 20}}>
     {largeName(item.fullName)}
    </Text>
   
    <Text style={{...styles.point,color: index == 0 ? "#9E8AE3" : '#3A9FE7',fontSize: sDisp() ? 18 : 20}}>
    {item.point}
    </Text>

    </View>
   
    
    </View>
  
  
    )}/>
  

    </View>
    <View style={styles.buttonWraper}>
            
            <TouchableOpacity style={{width: '40%'}}  onPress={()=>{setTabState(false)}}>
  
              <Text style={{...styles.button,fontSize: sDisp() ? 16 : 18}}>
              Топ
              </Text>
            
            </TouchableOpacity>
                
            <TouchableOpacity style={{width: '40%'}}  onPress={()=>{setTabState(true)}}>
           <Text style={{...styles.button,fontSize: sDisp() ? 16 : 18}}>
           Где я?
           </Text>
        
            </TouchableOpacity>
  
        </View>



    

    </View>
    </View>
  )
}
}
}



RatingScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Рэйтинг' ,
   
    headerRight: () => ( 
    
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
  
      <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
  
   </HeaderButtons>)
})



const styles = StyleSheet.create({
  truDirectWraper:{
    height: '100%',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    marginTop: 10,
    marginBottom: 10
  },
  directWraper: {
    textAlign: "center",
    flex: 1,
    alignItems: 'center',
    width: '85%',
    justifyContent: 'space-between',
    textAlign: "center",
    paddingTop: 20,

  },
  flatWraper: {
    width: '100%',
    height: 380,
    shadowColor: "#DCCAFF",
        shadowOffset: {
        width: 1,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 3.5,
        elevation: 6,
        borderRadius: 20,
   backgroundColor: '#fff',
   padding: 20
  },
  listItemWraper: {
    textAlign: "center",
    width: '100%',
    flexDirection: "row",
    // padding: 5,
    // backgroundColor: '#fff',
    justifyContent: "flex-end",
    position: "relative",
    marginTop: 10,
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center'
  },
  number: {
    fontSize: 20,
    backgroundColor: '#3A9FE7',
    borderRadius: 20,
    position: "absolute",
    left: 0,
    padding: 6,
    textAlign: 'center',
    minWidth: 40,
    minHeight: 40,
    color: '#fff',
    overflow: "hidden"
  },
  name: {

    textAlign: "center",
    fontSize: 20,
    color: '#000'

  },
  point: {
   
   marginRight: 10,
    fontSize: 20,
    color: '#3A9FE7'
  },
  button: {
    width: '100%',
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: "#3A9FE7",
    borderRadius: 20,
    overflow: 'hidden'
  },
  buttonWraper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    marginBottom: 20
  },
  lineWraper : {
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F2',
    justifyContent: 'space-between'
  },
  loadingContainer: {
    height: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 1
}
})