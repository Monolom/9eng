import React, {useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Text,StyleSheet, TouchableOpacity, FlatList,Animated,} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

import {THEME}  from '../theme'

import {loadTicher} from '../store/actions/ticher'
import {loadUser,baseRefreshRepeat} from '../store/actions/user'
import ImageModal from 'react-native-image-modal'
import { AppSound } from '../components/ui/AppSound'
import { ModalFinal } from '../components/ui/ModalFinal'


export const BaseScreen = ({navigation}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadUser())
      }, [dispatch])

    useEffect(() => {
        dispatch(loadTicher())
      }, [dispatch])

      const allUser = useSelector(state => state.user.allUser)

      const allTicher = useSelector(state => state.ticher.allTicher)

      const [tichButton,setTichButton] = useState('Урок 1')

      const [repetType,setRepeatType] = useState('word')

      const [replaceWord,setReplaceWord] = useState({})


      const [repeatCicle,setRepeatCicle] = useState({}) 

      // setTimeout(setRepeatCicle(JSON.parse(JSON.stringify(allTicher.find(item => item.title === 'Урок 1')))), 1000)

      const [loadBar,setLoadBar] = useState({base:0,update:0})

      const [chengeScreen,setchengeScreen] = useState({screen: 'main',dataRepeat: {}})

      const[finalModal,setFinalModal] = useState(false)

      const [repeatPoint,setRepeatPoint] = useState(0)

      useEffect(() => {
        if(allTicher[0]){
          setRepeatCicle(JSON.parse(JSON.stringify(allTicher[0])))
          setTichButton('Урок 1')
        }
      }, [allTicher])
   
      const chengeTichRepeatStatus = (titleTich) => {
        const repaetArr = JSON.parse(JSON.stringify(allTicher.find(item => item.title === titleTich)))
        setRepeatCicle(repaetArr) 

      }
      // console.log('хопа', allTicher)

      // console.log('иск', allUser)

      const fadeAnim = useRef(new Animated.Value(0)).current;
      const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      const openBaseRepeat = () => {

            if(repetType === 'word'){
               
        
                setReplaceWord(repeatCicle.data.word[0])
        
                setLoadBar({
                  base: repeatCicle.data.word.length,
                  update: repeatCicle.data.word.length
                })
        
                // console.log('кнопка', repeatCicle)
        
                setchengeScreen({...chengeScreen,screen: 'word'})
        
                fadeIn()
            }
            if(repetType === 'phrase'){
              
                    setReplaceWord(repeatCicle.data.phrase[0])

                    setLoadBar({
                      base: repeatCicle.data.phrase.length,
                      update: repeatCicle.data.phrase.length
                    })
                    // console.log('кнопка', repeatCicle)
                    setchengeScreen({...chengeScreen,screen: 'phrase'})
                    fadeIn()
            
            }

            


        }  


        const nextPhrase = (status) => {
            if(repeatCicle.data.phrase.length == 1){
          
              if(status === true){
                
                setRepeatPoint(repeatPoint+2)
                
                indexZ()
          
                refreshOpasity()
          
                
               
               
                // setchengeScreen({...chengeScreen,screen: 'main'})
          
                // console.log('закончилось')
          
                setchengeScreen({...chengeScreen,screen: 'main'})
                setFinalModal(true)
          
                // myLoadLine()
          
              }else{
                setRepeatPoint(repeatPoint-1)
                let hopas = repeatCicle
                // console.log('xz', hopas)
                hopas.data.word.push(hopas.data.phrase.shift()) 
                indexZ()
                setReplaceWord(hopas.data.phrase[0])
                refreshOpasity()
                // myLoadLine()
          
              }
            }else{
              
          if(status === true){
          
            setLoadBar({
             ...loadBar,
              update: repeatCicle.data.phrase.length
          
            })

            setRepeatPoint(repeatPoint+2)

            let hopas = repeatCicle
          
            // console.log('xz', hopas)
          
            hopas.data.phrase.shift()
          
            indexZ()
          
            setReplaceWord(hopas.data.phrase[0])
          
            setLoadBar({
              ...loadBar,
                 update: loadBar.update-1
             
               })
          
            refreshOpasity()
            // myLoadLine()
          }else{
           
            let hopas = repeatCicle
                // console.log('xz', hopas)
                hopas.data.word.push(hopas.data.phrase.shift()) 
                indexZ()
                setReplaceWord(hopas.data.phrase[0])
                refreshOpasity()
                // myLoadLine()
                setRepeatPoint(repeatPoint-1)
          }
          }
          
          }
 const nextWord = (status) => {
            if(repeatCicle.data.word.length == 1){
          
              if(status === true){
                
                setRepeatPoint(repeatPoint+2)
                indexZ()
          
                refreshOpasity()
          
                
               
               
                // setchengeScreen({...chengeScreen,screen: 'main'})
          
                // console.log('закончилось')
          
                setchengeScreen({...chengeScreen,screen: 'main'})
                setFinalModal(true)
          
                // myLoadLine()
          
              }else{
                setRepeatPoint(repeatPoint-1)
                let hopas = repeatCicle
                // console.log('xz', hopas)
                hopas.data.word.push(hopas.data.word.shift()) 
                indexZ()
                setReplaceWord(hopas.data.word[0])
                refreshOpasity()
                // myLoadLine()
          
              }
            }else{
              
          if(status === true){
          
            setLoadBar({
             ...loadBar,
              update: repeatCicle.data.word.length
            })

            setRepeatPoint(repeatPoint+2)

            let hopas = repeatCicle
          
            // console.log('xz', hopas)
          
            hopas.data.word.shift()
          
            indexZ()
          
            setReplaceWord(hopas.data.word[0])
          
            setLoadBar({
              ...loadBar,
                 update: loadBar.update-1
             
               })
          
            refreshOpasity()
            // myLoadLine()
          }else{
           
            let hopas = repeatCicle
                // console.log('xz', hopas)
                hopas.data.word.push(hopas.data.word.shift()) 
                indexZ()
                setReplaceWord(hopas.data.word[0])
                refreshOpasity()
                // myLoadLine()
                setRepeatPoint(repeatPoint-1)
          }
          }
          
          }



          
          const closeFinalModal = () => {
            dispatch(baseRefreshRepeat(repeatPoint))
            setRepeatCicle(JSON.parse(JSON.stringify(allTicher.find(item => item.title === 'Урок 1'))))
            setTichButton('Урок 1')
            setReplaceWord({})
            setLoadBar({base:0,update:0})
            setFinalModal(false)
            setRepeatPoint(0)
           
          }


          


///Логика Карточки 


const animatedValue = new Animated.Value(0);
     
let myValues = 0
animatedValue.addListener(({ value }) => {
    myValues = value
})
const frontInterpolate = animatedValue.interpolate({
  inputRange: [0, 180],
  outputRange: ['0deg', '180deg'],
})
const backInterpolate = animatedValue.interpolate({
  inputRange: [0, 180],
  outputRange: ['180deg', '360deg']
})
const frontOpacity = animatedValue.interpolate({
  inputRange: [89, 90],
  outputRange: [1, 0]
})
const frontHeight = animatedValue.interpolate({
  inputRange: [0, 400 ],
  outputRange: [400, 0]
})
const backOpacity = animatedValue.interpolate({
  inputRange: [89, 90],
  outputRange: [0, 1]
})

let ZetIndex = 0;

const   flipCard = (alert) => {
if (myValues >= 90) {
  // console.log('1.1')
  Animated.spring(animatedValue,{
    toValue: 0,
    friction: 8,
    tension: 10,
    useNativeDriver: true,
  }).start();

 
  
} else {
  // console.log('1.2')
  Animated.spring(animatedValue,{
    toValue: 180,
    friction: 8,
    tension: 10,
    useNativeDriver: true,
  }).start();
}

}

const indexY = () => {
indexX.setNativeProps({
zIndex: 1
})
}

const indexZ = () => {
indexX.setNativeProps({
  zIndex: 3
 })
}
const refreshOpasity  = () => {
  rOpasity.setNativeProps({
    opacity: 0
   })
  }
  // const myLoadLine  = () => {
  //   mLoadLine.setNativeProps({
  //     flex: (105 -  (repeatCicle.data.word.length * ( 1/(repeatCicle.data.word.length / 100))) )/ 100
  //   }
  //   )}
const frontAnimatedStyle = {
transform: [
  { rotateY: frontInterpolate }
]
}
const backAnimatedStyle = {
transform: [
  { rotateY: backInterpolate }
]
}
//Логика карточки

const tichRenderFilter = (title,indexs) => {
    let  indexTitle = 'Урок ' + indexs

    if(title === 'Урок 1'){
        // setRepeatCicle(allTicher[0])
        // setRepeatCicle(JSON.parse(JSON.stringify(allTicher[0])))
        return true
    }else{
        if(allUser.repeat[indexTitle][2].word === true & allUser.repeat[indexTitle][2].phrase === true ){
            return true
          }else{
            return false
          }
    }
    
}

        if(chengeScreen.screen === 'main'){

return (

  <View style={styles.directWraper}>  
    <ModalFinal visible={finalModal} myClose={closeFinalModal} points={repeatPoint}  /> 
    <View style={styles.wraperTue}>
       <FlatList style={styles.wraper} horizontal showsHorizontalScrollIndicator={false}  data={allTicher} keyExtractor={post => post.id.toString() } 
renderItem={({item,index}) => ( 

    tichRenderFilter(item.title,index) ? 

<TouchableOpacity onPress={()=> {
    setTichButton(item.title)
    chengeTichRepeatStatus(item.title)
}}>
<Text style={{...styles.tichButton,color:tichButton === item.title? '#fff' : '#000',backgroundColor: tichButton === item.title? THEME.MAIN_COLOR : THEME.BACK_GROUND}}>
{item.title}
</Text>

</TouchableOpacity> : null

)}/>
</View>

<View style={styles.wraperTue}>

<TouchableOpacity onPress={()=> {setRepeatType('word')}}>
<Text style={{...styles.tichButton,color:repetType === 'word' ? '#fff' : '#000',backgroundColor: repetType === 'word'? THEME.MAIN_COLOR : THEME.BACK_GROUND}}>
Cлова
</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=> {setRepeatType('phrase')}}>
<Text style={{...styles.tichButton,color:repetType === 'phrase'? '#fff' : '#000',backgroundColor: repetType === 'phrase'? THEME.MAIN_COLOR : THEME.BACK_GROUND}}>
Фразы
</Text>
</TouchableOpacity>
    
</View>
<TouchableOpacity onPress={()=>{openBaseRepeat(tichButton)}}>
    <Text style={styles.goButton}>
        Повторять
    </Text>
</TouchableOpacity>
  </View>
)


        }

        if(chengeScreen.screen === 'word'){

return (<Animated.ScrollView style={[
    styles.actionDirectWraper,
    {
      opacity: fadeAnim // Bind opacity to animated value
    }
  ]}>


       


<View style={styles.containerLoad}>

<View  style={{...styles.lineLoad,flex: 1 - (loadBar.update* 1/(loadBar.base/100) )/100 }}>

</View>
</View>
<View >

  

  <Animated.View ref={component => {  rOpasity = component}}  style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity:  backOpacity , zIndex : 2}]} >
  <View style={styles.actionContentWraper}>
        <Text style={styles.actionBigWord}>{replaceWord.word}</Text>
        <Text style={styles.actionTranscription}>{replaceWord.trans}</Text>
        <TouchableOpacity >
          <ImageModal
         
          resizeMode="contain"
           style={styles.activeImage} 
           source={{
            uri: replaceWord.image,
          }} 
          imageBackgroundColor={THEME.BACK_GROUND}
          />
        </TouchableOpacity>

        <AppSound sound={replaceWord.sound}/>
      
    </View>




      <View style={styles.activeButonContainer}>
        <TouchableOpacity  onPress={() => {
           nextWord(false) 
      }}>
          <Text style={styles.activeButonItem}>
            Не помню
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => { nextWord(true) }}>
          <Text style={styles.activeButonItem}>
            Помню
          </Text>
        </TouchableOpacity>
      </View>




  </Animated.View>

  <Animated.View ref={component => { indexX = component}}   style={[styles.flipCard, frontAnimatedStyle, {opacity: frontOpacity},{zIndex:  3 }]}>
<View style={styles.actionContentWraper} >

<Text style={styles.actionBigWord}>{replaceWord.phrase}</Text>

</View>
<TouchableOpacity   onPress={() => {flipCard(true)
indexY()
}} >
<Text style={styles.actionFirstButton}>
Показать ответ
</Text>
</TouchableOpacity>
</Animated.View>







  </View> 



        </Animated.ScrollView> )



        }


        if(chengeScreen.screen === 'phrase'){
            return ( <Animated.ScrollView style={[
                styles.actionDirectWraper,
                {
                  opacity: fadeAnim // Bind opacity to animated value
                }
              ]}>
            
            
                   
            
            
            <View style={styles.containerLoad}>
            
            <View  style={{...styles.lineLoad,flex: 1 - (loadBar.update* 1/(loadBar.base/100) )/100 }}>
            
            </View>
            </View>
            <View >
            
              
            
              <Animated.View ref={component => {  rOpasity = component}}  style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity:  backOpacity , zIndex : 2}]} >
              <View style={styles.actionContentWraper}>
                    <Text style={styles.actionBigWord}>{replaceWord.word}</Text>
                    <Text style={styles.actionTranscription}>{replaceWord.trans}</Text>
                    <TouchableOpacity >
                 
                    </TouchableOpacity>
            
                    <AppSound sound={replaceWord.sound}/>
                  
                </View>
            
            
            
            
                  <View style={styles.activeButonContainer}>
                    <TouchableOpacity  onPress={() => {
                       nextPhrase(false) 
                  }}>
                      <Text style={styles.activeButonItem}>
                        Не помню
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity   onPress={() => { nextPhrase(true) }}>
                      <Text style={styles.activeButonItem}>
                        Помню
                      </Text>
                    </TouchableOpacity>
                  </View>
            
            
            
            
              </Animated.View>
            
              <Animated.View ref={component => { indexX = component}}   style={[styles.flipCard, frontAnimatedStyle, {opacity: frontOpacity},{zIndex:  3 }]}>
            <View style={styles.actionContentWraper} >
            
            <Text style={styles.actionBigWord}>{replaceWord.phrase}</Text>
            
            </View>
            <TouchableOpacity   onPress={() => {flipCard(true)
            indexY()
            }} >
            <Text style={styles.actionFirstButton}>
            Показать ответ
            </Text>
            </TouchableOpacity>
            </Animated.View>
            
            
            
            
            
            
            
              </View> 
            
            
            
                    </Animated.ScrollView> );


            
        }



}

BaseScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'База знаний' ,
    
     headerLeft: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
     <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    
 </HeaderButtons>)
})


const styles = StyleSheet.create({


    directWraper: {
      width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 100
    

    }
    ,
    wraper: {
        maxWidth: '100%',
       marginTop: 0,
       overflow: "hidden",
       
    },
    tichButton: {
        padding: 20,
        backgroundColor: THEME.BACK_GROUND,
        fontSize: 20,
        marginHorizontal: 5,
        borderRadius: 5,
        display: "flex",   
        
    },
    wraperTue : {
        marginTop: 30,
       overflow: "hidden",
       flexDirection: "row",
       justifyContent: 'flex-start',
       alignItems: 'flex-start',
       width: '100%'
    },
    goButton: {
    
        color: "#fff",
        backgroundColor: THEME.MAIN_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 40,
        maxWidth: 200,
        fontSize: 23,
        marginTop: 30,
        textAlign: 'center',
        borderRadius: 5
    },
    actionDirectWraper: {
        flex: 1,
        width: "90%",
        marginLeft: '5%',
        marginRight: "5%",
        

    },
    actionContentWraper: {
        alignItems: 'center',
        width: "100%",
        height: 350,
        marginTop: 15,
        backgroundColor: THEME.BACK_GROUND,
       
    },
    actionBigWord: {
        fontSize: 32,
        fontFamily: 'open-regular',
        marginTop: 20
    },
    actionFirstButton: {
        
        fontSize: 25,
        color: '#ffffff',
        marginTop: 20,
        backgroundColor: THEME.MAIN_COLOR,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center'


    },
    flipCard: {
        width: "100%",
    
        alignItems: 'center',
        justifyContent: 'center',
   
        backfaceVisibility: 'hidden',
      },
      flipCardBack: {
      
        position: "absolute",
        top: 0,
     
      },
      flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
      },
      actionTranscription: {
        fontSize: 28,
        fontFamily: 'open-regular',
        marginTop: 0,
        color: THEME.AKCENT_COLOR
      },
      activeImage: {
        width: 200,
        height: 180,
        borderRadius: 10,
        marginTop: 10
      },
      activeButonContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
        justifyContent: "space-between"
      },
      activeButonItem: {
        width: 140,
        fontSize: 18,
        color: '#ffffff',
        backgroundColor: THEME.MAIN_COLOR,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center',
        textAlign : 'center'
      },
      containerLoad: {
        width: "100%",
        height: 10,
       flex: 1,
        marginTop: 15,
        flexDirection: "row"
       

      },
      lineLoad: {
        
        backgroundColor: THEME.AKCENT_COLOR,
        height: 10,
        borderRadius: 20
      }

})