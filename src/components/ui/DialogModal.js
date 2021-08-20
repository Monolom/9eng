//React,reactNative
import React, {useState,useRef,useEffect} from 'react'
import {ImageBackground,View,StyleSheet,TouchableOpacity,Button,Modal,Text,Image,Dimensions,Animated,Platform} from 'react-native'
// Redux
import { useDispatch } from 'react-redux'
// фугкция обновления данных (прогресс повторения)
import {refreshRepeat} from '../../store/actions/user'
// контейнер-список для скрола
import { FlatList } from 'react-native-gesture-handler'
// модуль сообщения в диалоге
import {ChatItem} from '../../components/ui/ChatItem'
// модули для свайпа
import  {FlingGestureHandler,Directions ,State} from 'react-native-gesture-handler'

// Реакт-навигация-модал "Диалоги"
export const DialogModal = ({navigation}) => {
// получаем  данные с reactNavigation
  const data = navigation.getParam('data', undefined)
  const curent = navigation.getParam('curent', undefined)
  const base = navigation.getParam('base', undefined)
  const but = navigation.getParam('flag',  1)
  const goButHistory = navigation.getParam('goFlag',  undefined)


  if(curent){


// Состояние стилей радиокнопок     
const opasityRadio1 = useRef(new Animated.Value(1)).current;

const opasityRadio2 = useRef(new Animated.Value(0)).current;

const opasityRadio3 = useRef(new Animated.Value(0)).current;

const opasityRadio4 = useRef(new Animated.Value(0)).current;

// Функция смены кнопки при первой загрузки
const chengeRadioFast = (radio) => {

  if(radio === 1){
    
      // setLevel(1)
      // goButHistory({...but, level: 1})
     
      Animated.timing(opasityRadio1, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false
        }).start()
        Animated.timing(opasityRadio2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()  
        Animated.timing(opasityRadio3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()  
  }

  if(radio === 2){
      // setLevel(2)
      // goButHistory({...but, level: 2})
      Animated.timing(opasityRadio2, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false
        }).start()
        Animated.timing(opasityRadio3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()  
        Animated.timing(opasityRadio1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()  
  }

  if(radio === 3){
      // setLevel(3)
      // goButHistory({...but, level: 3})
      Animated.timing(opasityRadio3, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false
        }).start()
        Animated.timing(opasityRadio2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()  
        Animated.timing(opasityRadio1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false
        }).start()  
  }
  
}

// Функция смены кнопки Автоплэя при первой загрузки
const chengeRadioTopFast = (flagAutoplay) => {
  if(flagAutoplay){
    Animated.timing(opasityRadio4, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false
    }).start()  
  }else{
    Animated.timing(opasityRadio4, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false
    }).start()  
  }
}

// Функция смены кнопки Автоплэя при первой загрузки
   const chengeRadioTop = (flagAutoplay) => {
    if(autoplay){
      setAutoplay(false)
      Animated.timing(opasityRadio4, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start()  
    }else{
      setAutoplay(true)
      Animated.timing(opasityRadio4, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start()  
    }
   }
// Функция смены кнопки 
    const chengeRadio = (radio) => {
  

      if(radio === 1){
          setLevel(1)
          // goButHistory({...but, level: 1})
         
          Animated.timing(opasityRadio1, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false
            }).start()
            Animated.timing(opasityRadio2, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }).start()  
            Animated.timing(opasityRadio3, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }).start()  
      }
      if(radio === 2){
          setLevel(2)
          // goButHistory({...but, level: 2})
          Animated.timing(opasityRadio2, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false
            }).start()
            Animated.timing(opasityRadio3, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }).start()  
            Animated.timing(opasityRadio1, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }).start()  
      }
      if(radio === 3){
          setLevel(3)
          // goButHistory({...but, level: 3})
          Animated.timing(opasityRadio3, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false
            }).start()
            Animated.timing(opasityRadio2, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }).start()  
            Animated.timing(opasityRadio1, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }).start()  
      }
    }


    


  // загружаем массив сообщений
  const dataArr = data[curent.index]['data']['phrase'][curent.theme]['data']
  //состояние настройки сложности
  const [level,setLevel] = useState(but.level)
  //состояние настройки автоплэя
  const [autoplay,setAutoplay] = useState(but.autoplay)
  //Состояние финальной кнопки
  const [finalButton,setFinalButton] = useState(false)
  // состояние паузы(при автоплэе)
  const[pauseState,setPauseState] = useState(false)
 // состояние закрытия звука при закрытии модального окна 
  const[closeSound,setCloseSound] = useState(false)


// Включаем паузу

  const goPause = () => {

    setPauseState(true)



  }


// Включаем плэй, показываем следующие сообщение

  const goPlay = () => {

    setPauseState(false)

    nextPhrase()

  }


  

// состояние блокировки кнопок
  const [disableButtons,setDisableButtons] = useState(false)
// сосотояние навигации между экранами настройки/навигация
  const [startDisplay,setStaertDisplay] = useState(true)
// состояние  первоели сообщение
  const [firstSound,setFirstSound] = useState(false)




  const dispatch = useDispatch()


// массив отрожающий количество уже показаных сообщений
const [arrProgress, setArrProgress] = useState({
  index: -1,
  arr: []
})

// ссылка на список сообщений
const flatlist = useRef(null);

const flexScrolBar = useRef(new Animated.Value(0.2)).current;


// записываем размер текущего устройства
const windowWidth = Dimensions.get('window').width;

//состояние стиля для анимации экранов
const fistDisplayRight = useRef(new Animated.Value(0)).current;

const secondDisplayRight = useRef(new Animated.Value(-windowWidth)).current;

const finalDisplayRight = useRef(new Animated.Value(-windowWidth)).current;


// Массив фоновых картинок 
const getBgImg = {
  'Аэропорт': require('../../../assets/bg/01b.jpg'),
  'Стойка регистрации': require('../../../assets/bg/02b.jpg'),
  'Таможня': require('../../../assets/bg/03b.jpg'),
  'Таможенный контроль': require('../../../assets/bg/04b.jpg'),
  'Объявления в Аэропорту': require('../../../assets/bg/05b.jpg'),
  'Рейс задерживается': require('../../../assets/bg/06b.jpg'),
  'В самолёте': require('../../../assets/bg/07b.jpg'),
  'Потеря багажа': require('../../../assets/bg/08b.jpg'),
  'Ситуации в аэропорту': require('../../../assets/bg/09b.jpg'),
  'Покупка билета в аэропорту': require('../../../assets/bg/10b.jpg'),
  'Где транспорт?': require('../../../assets/bg/11b.jpg'),
  'Как добраться до ЖД станции?': require('../../../assets/bg/12b.jpg'),
  'Вызов такси': require('../../../assets/bg/13b.jpg'),
  'Транспорт': require('../../../assets/bg/14b.jpg'),
  'Бронирование отеля': require('../../../assets/bg/15b.jpg'),
  'Регистрация в отеле': require('../../../assets/bg/16b.jpg'),
  'Что есть в отеле': require('../../../assets/bg/17b.jpg'),
  'Звонок на ресепшен': require('../../../assets/bg/18b.jpg'),
  'Выселение': require('../../../assets/bg/19b.jpg'),
  'Улица': require('../../../assets/bg/20b.jpg'),
  'Знакомства': require('../../../assets/bg/21b.jpg'),
  'Шоппинг': require('../../../assets/bg/22b.jpg'),
  'Магазин': require('../../../assets/bg/23b.jpg'),
  'Достопримечательности': require('../../../assets/bg/24b.jpg'),
  'Бронирование столика': require('../../../assets/bg/25b.jpg'),
  'Порекомендуйте ресторан': require('../../../assets/bg/26b.jpg'),
  'На входе в ресторан': require('../../../assets/bg/27b.jpg'),
  'Заказ официанту': require('../../../assets/bg/28b.jpg'),
  'В Банке': require('../../../assets/bg/29b.jpg'),
  'Запись к Дантисту': require('../../../assets/bg/30b.jpg'),
  'Регистратура': require('../../../assets/bg/31b.jpg'),
  'У Врача': require('../../../assets/bg/32b.jpg'),
  'Команды Врача': require('../../../assets/bg/33b.jpg'),
  'Жалобы': require('../../../assets/bg/34b.jpg'),
  'В аптеке': require('../../../assets/bg/35b.jpg'),
}




//приводим все настройки в исходное состояние
  useEffect(() => {

    setCloseSound(false)
    chengeRadioFast(but.level)

    chengeRadioTopFast(but.autoplay)

    Animated.timing(fistDisplayRight, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }).start()
      Animated.timing(secondDisplayRight, {
        toValue: - windowWidth,
        duration: 0,
        useNativeDriver: false
      }).start()

      setStaertDisplay(true)
      setDisableButtons(false)
    setArrProgress({
      index: -1,
      arr: []
    }
 )
 setFirstSound(false)
 Animated.timing(finalDisplayRight, {
  toValue: -windowWidth,
  duration: 0,
  useNativeDriver: false
}).start()

Animated.timing(flexScrolBar, {
  toValue: 0,
  duration: 0,
  useNativeDriver: false
}).start()  

setFinalButton(false)

}, [curent])



//функция блокировки/разблокировки кнопок
const goBlockButton = (bulean) => {
  setDisableButtons(bulean)
}
// Функция смены экрана на контентный
const goSecondDisplay = () => {
    Animated.timing(fistDisplayRight, {
        toValue: -windowWidth,
        duration: 300,
        useNativeDriver: false
      }).start()
      Animated.timing(secondDisplayRight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start()
      setStaertDisplay(false)
      setFirstSound(true)
      setDisableButtons(true)
      setTimeout( nextPhrase, 300)
}


// Кэлбэк запуска слудующего сообщения при автоплэе 
useEffect(() => {
if(disableButtons === false && firstSound === true && autoplay === true){
 if(finalButton){

 }else{ 

   if(!pauseState){

  setTimeout( nextPhrase, 300)

 }

}

}

},[disableButtons])


// функция добовления нового сообщения
const nextPhrase = () => {

  if(disableButtons === false){

  setDisableButtons(true)

  Animated.timing(flexScrolBar, {
    toValue:  ((arrProgress.index + 1) * 1/(dataArr.length/100) )/100 ,
    duration: 600,
    useNativeDriver: false

  }

).start()


  if(dataArr.length === arrProgress.index + 2){
    
    setFinalButton(true)
    setArrProgress({
      index: arrProgress.index + 1,
      arr: [...arrProgress.arr,dataArr[arrProgress.index + 1]]
    })
  }
  else if(dataArr.length === arrProgress.index +1 ){
    let checkDate = new Date()
    let curentDate = checkDate.getTime()
    if(base){
      if(curent.repeat === 0){
       
        dispatch(refreshRepeat(String(curent.index+1),curent.type,curent.theme,curentDate))
      }
    }else{
      dispatch(refreshRepeat(String(curent.index+1),curent.type,curent.theme,curent.time))
    }
 
    Animated.timing(finalDisplayRight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start()

     goButHistory({ level: level,autoplay: autoplay})


  }else{
    setArrProgress({
      index: arrProgress.index + 1,
      arr: [...arrProgress.arr,dataArr[arrProgress.index + 1]]
    })
  }
}else{
  console.log('рановато')
}
}






   

return <View style={{flex: 1}}>
   
  <ImageBackground resizeMethod={'resize'}  imageStyle={{
    resizeMode: "stretch",
  }} style={styles.background} 
   source={getBgImg[curent.theme]}
    >
      

     {  Platform.OS === "ios" ? <View style={{width: '100%',height: 16,backgroundColor: '#fff',position: 'absolute',top: 0}}></View> : <View style={{width: '100%',height: 16,backgroundColor: '#fff',position: 'absolute',top: 0}}></View> }

      
        <View style={{...styles.progBarWrap, top: 15, zIndex: 10,elevation: 3}}>
    
    <View style={styles.progBar}  >
        <Animated.View style={{...styles.barIndicator , flex: flexScrolBar }}>
        </Animated.View>
    </View>

    <TouchableOpacity style={{position: 'absolute', top: 6.5,right: 0,width: '20%' }} onPress={()=>{
      setCloseSound(true)
      navigation.goBack()}}>

     <View style={{height: 47,width: "100%", alignItems: 'center', flexDirection: 'row',} }>
     <Image style={styles.closeButton} source={  require('../../../assets/img/close.png')}></Image>  
     </View>

    </TouchableOpacity>
</View>


<Animated.View style={{...styles.swipeBlock, paddingTop:Platform.OS === 'ios' ? 75 : 60, paddingBottom: 60,right: secondDisplayRight,top: 0}}>
<FlingGestureHandler  

enabled={ autoplay ? false : !disableButtons}

 numberOfPointers={1}

direction={Directions.LEFT}

onHandlerStateChange={({ nativeEvent }) => {

     
 if (nativeEvent.state === State.ACTIVE ) {

    nextPhrase()


 }

}}>
<View style={styles.chatWraper}>

<FlatList
 keyExtractor={(item, index) => 'key'+index}
 data={arrProgress.arr}
 ref = {flatlist}
 onContentSizeChange={()=> {
   flatlist.current.scrollToEnd()
  }}
 renderItem={({item,index})=>{
  return (

        <ChatItem state={level} en={item.en} ru={item.ru} index={index} sound={item.sound} first={item.first} firstSound={index === 0 ? true : false} soundPlay={firstSound} dButton={goBlockButton} closeSound={closeSound} buttonState={disableButtons}></ChatItem>

 )
 }}

>


</FlatList>


</View>
</FlingGestureHandler>
</Animated.View>

<Animated.View style={{...styles.swipeBlock, paddingTop:Platform.OS === 'ios' ? 75 : 60,paddingBottom:  60,left: fistDisplayRight,top: 0,}}>


<View style={styles.titleWraper}>

                <Text style={{...styles.title,marginBottom: 20}}>
                   {curent.theme}
                </Text>
                <TouchableOpacity activeOpacity={0.9}  onPress={()=> {chengeRadioTop(autoplay)}}>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignContent: 'space-around',}}>
               
<View style={styles.radioItemTop} >



   
<View style={{...styles.circleWraperTop,marginRight: 0}}>
 <Animated.View style={{...styles.circleTop, opacity: opasityRadio4 }}>

 </Animated.View>
</View>


</View>


<Text style={{...styles.title,fontSize: 15,paddingLeft: 0,marginHorizontal: 0,fontFamily: 'sf-regular'}}>автовоспроизведение</Text>

                </View>
                </TouchableOpacity>
               
</View>





            <View style={styles.radioWraper}>

            <Text style={styles.radioTitle}>

выберите сложность истории

</Text>

<TouchableOpacity activeOpacity={0.9}  onPress={()=> {chengeRadio(1)}}>
<View style={styles.radioItem} >



   
<View style={styles.circleWraper}>
 <Animated.View style={{...styles.circle, opacity: opasityRadio1 }}>

 </Animated.View>
</View>


<View style={styles.radioTextWraper} >
    <Text style={styles.radioItemTitle}>новичок</Text>
    <Text style={styles.radioSpan}>Весь текст истории открыт</Text>
</View>
</View>
</TouchableOpacity>


<TouchableOpacity activeOpacity={0.9} onPress={()=> {chengeRadio(2)}}>
<View style={styles.radioItem} >



   
<View style={styles.circleWraper}>
<Animated.View style={{...styles.circle, opacity: opasityRadio2 }}>

</Animated.View>
</View>


<View style={styles.radioTextWraper} >

    <Text style={styles.radioItemTitle}>продвинутый</Text>
    <Text style={styles.radioSpan}>руский текст будет скрыт</Text>
</View>
</View>
</TouchableOpacity>
<TouchableOpacity activeOpacity={0.9} onPress={()=> {chengeRadio(3)}}>
<View style={styles.radioItem} >

    

   
<View style={styles.circleWraper}>
<Animated.View style={{...styles.circle, opacity: opasityRadio3}}>

</Animated.View>
</View>


<View style={styles.radioTextWraper} >
    <Text style={styles.radioItemTitle}>super</Text>
    <Text style={styles.radioSpan}>доступны только аудио примеры</Text>
</View>

</View>
</TouchableOpacity>



</View>

</Animated.View>


<TouchableOpacity  activeOpacity={0.8} disabled={ !autoplay ? disableButtons : !pauseState ?  false : disableButtons} style={{width: '100%', alignSelf: "flex-end",position: 'absolute',bottom: 0 }} onPress={()=>{
  startDisplay ? goSecondDisplay() : finalButton ? nextPhrase() : !autoplay ? nextPhrase() : pauseState ? goPlay() : goPause()



     }}>

<Text style={{...styles.bottomButton, alignSelf: 'flex-end'}}>

  {finalButton ? "завершить" : !autoplay ? "далее" : startDisplay ? 'далее' :  !pauseState ? 'пауза' : 'далее'}

</Text>

</TouchableOpacity>

        </ImageBackground>
   


 {/* FINAL DISPLAY  */}
        
   <Animated.View style={{...styles.directContainer, top: 0 , right: finalDisplayRight

    ,height: '100%' , zIndex: 12

    ,
    elevation: 5 ,
   
    width: '100%',
    backgroundColor: '#f3f'

    }}>
    

    <ImageBackground source={require('../../../assets/img/finalwordbg.jpg')} style={{width: '100%',height: '100%',flexDirection: 'column',alignContent: 'flex-end'}} >


    <View style={{width: '100%',height: '100%',justifyContent: 'flex-end'}}>

    <Text style={{...styles.preSpan,textAlign: 'center',color: '#000'}}>
            повторение материала скоро 
            будет доступно в разделе "повторение"
     </Text>

<TouchableOpacity activeOpacity={0.9} style={{width: '100%' }} onPress = {() => {
navigation.goBack()

 }}>

<Text style={{...styles.bottomButton, alignSelf: 'flex-end', fontFamily: 'prosto-regular'}}>

   super

</Text>

</TouchableOpacity>


</View>   


    </ImageBackground>

  
   </Animated.View>
 {/* FINAL DISPLAY  */}
 </View>  


}else{



// Копирование хуков чтобы реакт не ругался 



  const [level,setLevel] = useState(1)

  const [disableButtons,setDisableButtons] = useState(false)
  
  const [startDisplay,setStaertDisplay] = useState(true)
  
  const [firstSound,setFirstSound] = useState(false)

  const dispatch = useDispatch()



const [arrProgress, setArrProgress] = useState({
  index: -1,
  arr: []
})

const flatlist = useRef(null);


const flexScrolBar = useRef(new Animated.Value(0.2)).current;

const opasityRadio1 = useRef(new Animated.Value(1)).current;

const opasityRadio2 = useRef(new Animated.Value(0)).current;

const opasityRadio3 = useRef(new Animated.Value(0)).current;



const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

const fistDisplayRight = useRef(new Animated.Value(0)).current;

const secondDisplayRight = useRef(new Animated.Value(-windowWidth)).current;

const finalDisplayRight = useRef(new Animated.Value(-windowWidth)).current;

useEffect(() => {

  Animated.timing(fistDisplayRight, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false
    }).start()
    Animated.timing(secondDisplayRight, {
      toValue: - windowWidth,
      duration: 0,
      useNativeDriver: false
    }).start()

    setStaertDisplay(true)
    setDisableButtons(false)

setFirstSound(false)
Animated.timing(finalDisplayRight, {
toValue: -windowWidth,
duration: 0,
useNativeDriver: false
}).start()

Animated.timing(flexScrolBar, {
toValue: 0,
duration: 0,
useNativeDriver: false
}).start()  

}, [curent])

  return <View> <Text>hui</Text></View>
}
    }


const styles = StyleSheet.create({
    
    radioWraper : {
        width: '100%',
        marginBottom: 20,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    background: {
      width: '100%',
      height: '100%',
      flex: 1,
       justifyContent: 'flex-end',
       flexDirection: 'column',
       backgroundColor: '#000',
       position: 'relative'
    },
    radioItem : {
        marginLeft: '14%',
        paddingRight: '5%',
        width: '80%',
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',

 
    },
    radioItemTop : {
      marginLeft: 0,
      paddingRight:0,
   
      flexDirection: 'row',
      marginBottom: 0,
      alignItems: 'center',
      marginRight: 15

  },
    circleWraper: {
        width: 46,
        height: 46,
        borderRadius: 25,
        backgroundColor: '#fff',
        marginRight: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    },
    circle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#22b312"
    },
    circleWraperTop: {
      width: 35,
      height: 35,
      borderRadius: 8,
      backgroundColor: '#fff',
      marginRight: 20,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'

  },
  circleTop: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: "#22b312"
  },
    radioTextWraper: {
        height: '100%',
       
        
    },
    radioItemTitle: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 0,
        lineHeight: 25,
        fontFamily: 'sf-regular'
 
    },
    radioSpan: {
        fontSize: 16,
        color: '#a0a0a0',
        fontFamily: 'sf-regular'
   
    },
    radioTitle: {
        fontSize: 22,
        color: '#fff',
        marginLeft: '10%',
        marginRight:'5%',
        marginBottom: 35,
        fontFamily: 'sf-regular'
        
    },
    titleWraper: {
     
       
       
      
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     
      

    },
    title: {
        fontSize: 26,
        color: '#fff',
        textAlign: 'center',
        marginHorizontal: '10%',
        fontFamily: 'sfUi-black'
        
    },
    directWraper: {
    flex:1,
    justifyContent: 'flex-end',
    flexDirection: 'column'
    
},
bottomButton: {

    fontFamily: 'circe-ebold',
    fontSize: 20,
    width: '100%',
    paddingVertical: 15,
    backgroundColor: "#22b312",
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    height: 60
},
  progBarWrap : {
       width: '100%',

       position: 'absolute',
       height : 60,
       justifyContent: 'center',
       flexDirection: 'row' ,
       alignItems: 'center',
       backgroundColor: '#fff',
     
 
   },
   progBar : {
    width: '60%',
    height: 4,
    borderRadius: 2,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(160, 160, 160,0.2)',
    flexDirection: 'row'
},
barIndicator: {
    backgroundColor: '#42a9e0',
    flex: 0.2,
    
},
closeButton: {
    width: 28,
    height: 28,
    marginLeft: 15,
    

 
},
swipeBlock: {
 
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'column',
   
        position: 'absolute',
        
 
},
chatWraper: {
  flex: 1,
  // backgroundColor: '#f53',

},
chatWraperItem: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginBottom: 15
},
chatTextBlock: {
  maxWidth: '75%',
  backgroundColor: "#C027B7",
  padding: 10,
  paddingLeft: 20,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  justifyContent: 'space-between'
},
chatTextBlockSecond: {
  maxWidth: '75%',
  backgroundColor: "#024AC0",
  padding: 10,
  paddingRight: 20,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  justifyContent: 'space-between'
},
chatSoundBlok: {
  width: '25%',
  // backgroundColor: '#3ff',
  justifyContent: 'center',
  alignItems: 'center'

},
ruText: {
  color: "#fff",
  textAlign: 'right',
  fontSize: 14,
  fontFamily:  'sf-regular',
},
enText: {
  color: "#fff",
  textAlign: 'right',
  fontFamily: 'sfUi-heavy',
  fontSize: 16
},
soundText: {
  fontSize: 10,
  color: '#fff',
  textAlign: 'center'
},
directContainer: {
  flex: 1,
  justifyContent:'space-between',
  alignContent: "center",
  alignItems: 'center',
  backgroundColor: '#fff',
  position: 'relative',
  flexDirection: 'column',
  position: 'absolute',
},
preSpan: {
  fontFamily: 'sf-regular',
  fontSize: 14,
  textAlign: 'left',
  color: '#a0a0a0',
  marginTop: 5,
  marginBottom: 5,
  width: '80%',
  marginHorizontal: '10%',
  letterSpacing: 0.5

},
bottomButton: {

  fontFamily: 'circe-ebold',
  fontSize: 20,
  width: '100%',
  paddingVertical: 15,
  backgroundColor: "#22b312",
  color: '#fff',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: 0.7

},

})