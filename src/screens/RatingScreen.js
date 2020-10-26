import React,{useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
// import {DATA} from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
// import { Postlist } from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { statUser } from '../store/actions/stat'
import {firebase} from '../firebase/config'
import { ceil } from 'react-native-reanimated'
import { THEME } from '../theme'


export const RatingScreen = ({navigation}) => {

    const  openPostHandler = post => {

        navigation.navigate( 'Post', {postId: post.id, date: post.date,booked: post.booked } )

    }   
  




    let  userUid = firebase.auth().currentUser.uid
     
    const [tabState,setTabState] =  useState(false)
    
    const dispatch = useDispatch()
    
    useEffect(() => {

         dispatch(statUser())

      }, [dispatch])

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

 


// console.log(
// 'Готово', allStat
// )
console.log('проверка',indexUsre)
if(!tabState){
  return (
    <View style={styles.truDirectWraper}>
        <Text style={styles.title}>Рэйтинг</Text>
    <View style={styles.directWraper}>
    
      <View style={styles.flatWraper}>
      <FlatList  showsVerticalScrollIndicator={false}  keyExtractor={post => post.id.toString() }  data={statTop.slice(0,10) } 
  renderItem={({item,index}) => ( 
  
  
  
  
  
  
      <View style={styles.listItemWraper}>
  
      <Text style={styles.number}>
       {index + 1}
      </Text>
    
    <Text style={styles.name}>
     {item.fullName}
    </Text>
    
    <Text style={styles.point}>
    {item.point}
    </Text>
    
    </View>
  
  
    )
  
  }/>
  

    </View>
    <View style={styles.buttonWraper}>
            
            <TouchableOpacity  onPress={()=>{setTabState(false)}}>
  
              <Text style={styles.button}>
              Топ
              </Text>
            
            </TouchableOpacity>
                
            <TouchableOpacity  onPress={()=>{setTabState(true)}}>
           <Text style={styles.button}>
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
        <Text style={styles.title}>Рэйтинг</Text>
    <View style={styles.directWraper}>
    
      <View style={styles.flatWraper}>
      <FlatList  showsVerticalScrollIndicator={false}  keyExtractor={post => post.id.toString() }  data={indexUsre < 3 ?statTop.slice(indexUsre,indexUsre+10) : statTop.slice(indexUsre-3,indexUsre+6)} 
  renderItem={({item,index}) => ( 
  
  
  
  
  
  
      <View style={styles.listItemWraper}>
  
      <Text style={styles.number}>
       {index + 1}
      </Text>
    
    <Text style={styles.name}>
     {item.fullName}
    </Text>
    
    <Text style={styles.point}>
    {item.point}
    </Text>
    
    </View>
  
 
    )
  
  }/>
 
      </View>

      <View style={styles.buttonWraper}>
            
            <TouchableOpacity  onPress={()=>{setTabState(false)}}>
  
              <Text style={styles.button}>
              Топ
              </Text>
            
            </TouchableOpacity>
                
            <TouchableOpacity  onPress={()=>{setTabState(true)}}>
           <Text style={styles.button}>
           Где я?
           </Text>
        
            </TouchableOpacity>
  
        </View>
      
    

      
      
    </View>
    </View>
  )
}

}



RatingScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Рэйтинг' ,
   
     headerLeft: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
     <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    
 </HeaderButtons>)
})



const styles = StyleSheet.create({
  truDirectWraper:{
    height: '100%',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center'
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
  },
  flatWraper: {
  
   width: '100%',
   maxHeight: 342
  },
  listItemWraper: {
    textAlign: "center",
    width: '100%',
    flexDirection: "row",
    padding: 5,
    backgroundColor: '#CACED9',
    justifyContent: "center",
    position: "relative",
    marginTop: 10,
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center'
  },
  number: {
    fontSize: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    position: "absolute",
    left: 0,
    padding: 10,
    borderColor: "#F5F23D",
    borderWidth: 2,
    textAlign: 'center',
    minWidth: 50
  },
  name: {
    flex: 1,
    textAlign: "center",
    fontSize: 20
  },
  point: {
    position: 'absolute',
    right: 10,
    fontSize: 20,
    color: '#60C187'
  },
  button: {
    fontSize: 27,
    color: '#fff',
    backgroundColor: THEME.MAIN_COLOR,
    minWidth: 130,
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
   
  },
  buttonWraper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between"
  }
})