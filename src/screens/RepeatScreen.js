import React, {useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {NativeModules,View,Text,StyleSheet, TouchableOpacity, FlatList,ScrollView,Button,Animated,LayoutAnimation, CheckBox, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {Ionicons} from '@expo/vector-icons'
import {THEME}  from '../theme'
import { ModalChoise } from '../components/ui/ModalChoise'
import {loadTicher} from '../store/actions/ticher'
import {loadUser,refreshRepeat} from '../store/actions/user'
import ImageModal from 'react-native-image-modal'
import { AppSound } from '../components/ui/AppSound'
import { ModalFinal } from '../components/ui/ModalFinal'





export const RepeatScreen = ({navigation}) => {

    const [repeatCicle,setRepeatCicle] = useState({}) 

    const [replaceWord,setReplaceWord] = useState({})

    const [curentRepeat,setCurentRepeat] = useState({})

    const [repeatPoint,setRepeatPoint] = useState(0)

    const [loadBar,setLoadBar] = useState({base:0,update:0})

    const [modal,setModal] = useState(false)

    const [choiseModalInfo,setChoiseModalInfo] = useState({})

    const[finalModal,setFinalModal] = useState(false)
    
    const [modalButton,setModalButton] = useState({phrase: true,word: true})
  
    const [chengeScreen,setchengeScreen] = useState({screen: 'main',dataRepeat: {}})

    const [loadData,setLoadData] = useState(false)

    const RepeatIndicatorPosition = (indicators) => {
     
       return ( indicators.findIndex(item => item.phrase === false || item.phrase === false ) -1)

    }

    const dispatch = useDispatch()
    
    useEffect(() => {
         dispatch(loadUser())
        //  setLoadData(true)
      }, [dispatch])

    useEffect(() => {

        dispatch(loadTicher())
      
      }, [dispatch])


      const fadeAnim = useRef(new Animated.Value(0)).current;
  
      const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };
    
      const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };    
  

    
   
     
    









      const indexZ = () => {
        indexX.setNativeProps({
          zIndex: 3
         })
        }

      const indexY = () => {
          indexX.setNativeProps({
            zIndex: 1
           })
          }
    
        
      const refreshOpasity  = () => {
              rOpasity.setNativeProps({
                opacity: 0
               })
              }


              
    const allUser = useSelector(state => state.user.allUser)

    const allTicher = useSelector(state => state.ticher.allTicher)

    // console.log('новый стэйт', allUser)
    const noneRepeatAlert = (time) => {
      Alert.alert(
        'Повторение пока не доступно',
      `Будет открыто через: ${millisecToTimeStruct(time).d} дней ${millisecToTimeStruct(time).h} часов ${millisecToTimeStruct(time).m} минут ${millisecToTimeStruct(time).s} секунд`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
      )
    }
    millisecToTimeStruct = function (ms) {
      var d, h, m, s;
      if (isNaN(ms)) {
          return {};
      }
      d = ms / (1000 * 60 * 60 * 24);
      h = (d - ~~d) * 24;
      m = (h - ~~h) * 60;
      s = (m - ~~m) * 60;
      return {d: ~~d, h: ~~h, m: ~~m, s: ~~s};
  }
    const chekRepeatTime = (data,index) => {
      let checkDate = new Date()
      let checkDateSum = checkDate.getTime()
      let repetName = data[index].title
      // console.log("проверка11111111111111111111111111111", checkDateSum - data[index-1].time)
     
      if(index === 0){
        return true
    
      }
      
      else {
        if(repetName === '6ч'){
          if(checkDateSum - data[index-1].time   >=  600){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 600 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '24ч'){
          if(checkDateSum - data[index-1].time   >=  600){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '3д'){
          if(checkDateSum - data[index-1].time   >=  8000000000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '7д'){
          if(checkDateSum - data[index-1].time   >=  60000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60000 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '14д'){
          if(checkDateSum - data[index-1].time   >=  60000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60000 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '30д'){
          if(checkDateSum - data[index-1].time   >=  60000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60000 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '90д'){
          if(checkDateSum - data[index-1].time   >=  60000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60000 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '180д'){
          if(checkDateSum - data[index-1].time   >=  60000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60000 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
        if(repetName === '360д'){
          if(checkDateSum - data[index-1].time   >=  60000){
            return true
          }else{
            noneRepeatAlert(60000 - (checkDateSum - data[index-1].time))
            console.log('Доступ откроеться через', 60000 - (checkDateSum - data[index-1].time) )
            return false
          }
        }
      }


    }
 

    const ConsoleClick = (data,tichTitle) => {

    let indexRepeat = data.findIndex(item => item.phrase === false || item.word === false )

      if(chekRepeatTime(data,indexRepeat) ){

        setChoiseModalInfo({tich: tichTitle ,index:data[indexRepeat].title})

        let indexRepeatPhrase = data[indexRepeat].phrase
    
        let indexRepeatWord = data[indexRepeat].word 
    
        // console.log('eeeee', choiseModalInfo)
        
        const repaetArr = JSON.parse(JSON.stringify(allTicher.find(item => item.title === tichTitle)))
      
        setCurentRepeat({title: tichTitle, index: indexRepeat})
    
        setRepeatCicle(repaetArr)
    
        // console.log('Вход',repaetArr)
    
        setModalButton({phrase: indexRepeatPhrase, word:indexRepeatWord })
    
        setModal(true)
      }
    

    }  
    

    const CloseModal = () => {

        setModal(false)

       }

    const  openWord = () => {

      
        setCurentRepeat({...curentRepeat, repeat: 'word'})

        // setRepeatCicle(repeatCicle.data)

        setReplaceWord(repeatCicle.data.word[0])

        setLoadBar({
          base: repeatCicle.data.word.length,
          update: repeatCicle.data.word.length

        })

        CloseModal()

        setchengeScreen({...chengeScreen,screen: 'word'})

        fadeIn()
       
    }

    const  openPhrase = () => {

      setCurentRepeat({...curentRepeat, repeat: 'phrase'})

      // setRepeatCicle(repeatCicle.data)

      setReplaceWord(repeatCicle.data.phrase[0])

      setLoadBar({
        base: repeatCicle.data.phrase.length,
        update: repeatCicle.data.phrase.length
      })

      CloseModal()

      setchengeScreen({...chengeScreen,screen: 'phrase'})

      fadeIn()

    }
    const DescriptionIconСhoice = (flag) => {

        if(flag.word === true & flag.phrase === true){
            return 'ios-radio-button-on'
        }
       
        if(flag.word === false & flag.phrase === false){
            return 'ios-radio-button-off'
        }
        if(flag.phrase === true || flag.word === true){
            return 'ios-contrast'
        }
       
    }

const nextWord = (status) => {
  if(repeatCicle.data.word.length == 1){

    if(status === true){
      
      setRepeatPoint(repeatPoint+3)

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
  setRepeatPoint(repeatPoint+3)
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



const nextPhrase = (status) => {
  if(repeatCicle.data.phrase.length == 1){

    if(status === true){
      
      setRepeatPoint(repeatPoint+3)
      
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
  setRepeatPoint(repeatPoint+3)
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






const closeFinalModal = () => {

  let date = new Date()

  // console.log("Дата", date.getTime())

  let newDateRepeat = 0

  if(curentRepeat.repeat === 'word' & modalButton.phrase === true){

    newDateRepeat = date.getTime()
  }

  if(curentRepeat.repeat === 'phrase' & modalButton.word === true){

    newDateRepeat = date.getTime()
  }

  // setModalButton({phrase: indexRepeatPhrase, word:indexRepeatWord })

  setRepeatCicle({}) 
  setReplaceWord({})
  setLoadBar({base:0,update:0})
  setFinalModal(false)
  dispatch(refreshRepeat(curentRepeat.title,curentRepeat.index,curentRepeat.repeat,repeatPoint,newDateRepeat))
  setRepeatPoint(0)
}

const  renserTichListCheck = (titles,indexs) => {
  // console.log("заголовок", titles )
  // console.log('слово', allUser.repeat[titles][2].word )
  // console.log('слово', allUser.repeat[titles][2].phrase )
  let  indexTitle = 'Урок ' + indexs
  
  if(titles === 'Урок 1'){

    return true

  }else{
   
    if(allUser.repeat[indexTitle][2].word === true & allUser.repeat[indexTitle][2].phrase === true ){
      return true
    }else{
      return false
    }
 
  }


}

// console.log('Новый стэйт', allUser)

if(allUser.repeat){


if(chengeScreen.screen === 'main'){



return (
<ScrollView>
<ModalFinal visible={finalModal} myClose={closeFinalModal} points={repeatPoint}  /> 
<ModalChoise modalInfo={choiseModalInfo} visible={modal} onCancel={()=>setModal(false)} Press={CloseModal}  data={modalButton} navigation={navigation} CloseModal={CloseModal} openWord={openWord} openPhrase={openPhrase} /> 

  <FlatList style={styles.directWraper}  data={allTicher} keyExtractor={post => post.id.toString()}
  renderItem={({item,index}) => ( 

    renserTichListCheck(item.title,index) ? 
    <View style={styles.itemLearn}>
    <View style={styles.itemTopWraper}>
    <Text style={styles.bigText}>
      {item.title}
    </Text>
    <View style={styles.discriptionWraper}>
<View><Text>{'#' + item.discription1}</Text><Text>{'#' + item.discription2}</Text></View>
        <View><Text>{'#' + item.discription3}</Text><Text>{'#' + item.discription4}</Text></View>
    </View>
    </View>
  
    <View style={styles.itemBotWraper}>
  
        <View style={styles.indicatorWraper}>
      
      
        <FlatList horizontal showsHorizontalScrollIndicator={false} style={styles.indicatorWraper}   data={allUser.repeat[item.title]} keyExtractor={post => post.id.toString() } initialScrollIndex={RepeatIndicatorPosition(allUser.repeat[item.title])}
renderItem={({item}) => ( 


<View style={styles.indicatorItemWraper}>
<View style={styles.indicatorDot}><Ionicons
        name={DescriptionIconСhoice(item)}
        color="green"/></View>

<Text style={styles.indicatorText} >{item.title}</Text>

            </View>
)}/>
            
          
        </View>
        <TouchableOpacity style={styles.itemButtonWraper} activeOpacity={0.7} onPress={()=> {ConsoleClick(allUser.repeat[item.title], item.title)}}>
        <Text style={styles.itemButton}> Повторить </Text>
        </TouchableOpacity>
    </View>
</View> : null


 
    





)}/>

</ScrollView>
)
}



    
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


        // const { UIManager } = NativeModules;
        // UIManager.setLayoutAnimationEnabledExperimental &&
        // UIManager.setLayoutAnimationEnabledExperimental(true);

        // const indexX = useRef(null)

        // const indexY = () => {
        //   // `current` указывает на смонтированный элемент `input`
        //   indexX.current.setNativeProps({ zIndex: 1 })

        // }


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


     
      if(chengeScreen.screen === 'word'){
     
        // let loadLineWidth =  (105 -  (repeatCicle.data.word.length * ( 1/(repeatCicle.data.word.length / 100))) )/ 100
        
        

        // const setLoadWidths = (param) => {
        //     return 1 - param.data.word.length *  (1/(param.data.word.length/100))/100
        // }
        // console.log('ширина', loadBar)
    
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
                  <ImageModal
                 
                  resizeMode="contain"
                   style={styles.activeImage} 
                   source={{
                    uri: replaceWord.image,
                  }} 
                  imageBackgroundColor={THEME.BACK_GROUND}
                  />
                </TouchableOpacity>

                <AppSound sound={replaceWord.sound} stateEfect={repeatPoint}/>
              
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
      


                </Animated.ScrollView> );
    
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

        <AppSound sound={replaceWord.sound} stateEfect={repeatPoint}/>
      
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
}else{
  return null
}


}




RepeatScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'Повторения' ,
     headerLeft: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
     <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
     </HeaderButtons>)
})


const styles = StyleSheet.create({
    directWraper: {
       flex: 1
    },
    itemLearn: {
       padding: 15,
       backgroundColor: THEME.BACK_GROUND,
       marginTop: 15
    },
    bigText: {
        fontFamily: 'open-regular',
        fontSize: 25,
        color: '#000000',
        marginBottom: 15
        
    },
    itemBotWraper: {
     flexDirection: "row",
     justifyContent: 'space-between',
     width:  "100%",
     
     alignContent: 'flex-end',
     alignItems: 'flex-end'

    },
    itemTopWraper: {
    flexDirection: 'row'
    },
    indicatorWraper: {
   
     width: "60%",
     marginRight: 20
    },
    indicatorDot: {
  
        width: 12,
        height: 12,
      
        marginBottom: 9
    },
    indicatorDotActive: {
       
        width: 12,
        height: 12,
       
        marginBottom: 9
    },
    indicatorText: {
        fontSize: 12,
        color: '#000000',
    },
    itemButtonWraper: {
        width: '35%',
    },
    itemButton: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: THEME.MAIN_COLOR,
        borderRadius: 4,
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    indicatorItemWraper: {
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    discriptionWraper: {
        flexDirection: "row",
        justifyContent: 'space-around',
        width: "50%",
        marginLeft: 15
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