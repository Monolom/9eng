import React, {useState,useRef,useEffect} from 'react'
import {ImageBackground,View,StyleSheet,TouchableOpacity,Button,Modal,Text,Image,Dimensions,Animated,Platform} from 'react-native'
import {Ionicons,FontAwesome5} from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { WordSound } from './WordSound'
import {refreshRepeat} from '../../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import {loadTicher} from '../../store/actions/ticher'
import  {FlingGestureHandler,PanGestureHandler,GestureHandlerRootView,Directions , State} from 'react-native-gesture-handler'
export const WordModal = ({navigation}) => {

    // const data = JSON.stringify(navigation.getParam('data', undefined))
    const curent = navigation.getParam('curent', undefined)
    const base = navigation.getParam('base', undefined)

const dispatch = useDispatch()

useEffect(() => {

    dispatch(loadTicher())
  
}, [dispatch])

  const data = useSelector(state => state.ticher.allTicher)
const [contentSize, setContentSize] = useState(1);

const [visibleScrollContainer, setVisibleScrollContainer] = useState(windowWidth);

const scrollIndicator = useRef(new Animated.Value(0)).current;

const [visibleScrollBarCore,setVisibleScrollBarCore] = useState(true)

const [visibleScrollBar, setVisibleScrollBar] = useState(true);  

const [arrLength,setArrLength ] = useState(false)

const [activeButonNext,setActiveButtonNext] = useState(false)

const [ playStatus,setPlayStatus] = useState(false)

// console.log('modalData', data)
// console.log('modalCurent', curent)
// const [wordArr, setWordArr] = useState(false)

// if(curent){

//     setArrLength({curent: 0, length: JSON.parse(JSON.stringify(  data[String(curent.index - 1)]['data']['word'][curent.theme].length))})

//     setWordArr(JSON.parse(JSON.stringify( data[String(curent.index - 1)]['data']['word'][curent.theme])))   
  
// }

let wordArr

useEffect(() => {
    
       if(curent){
        // console.log('indexCurent', curent.index)
        // console.log('modalCurent', data[0]['data']['word']["Аэропорт"])
        
    

             setArrLength({first: 0,second:0, length: data[curent.index]['data']['word'][curent.theme].length})

       }

  }, [curent])


const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

const fistDisplayRight = useRef(new Animated.Value(0)).current;

const secondDisplayRight = useRef(new Animated.Value(-windowWidth)).current;

const finalDisplayRight = useRef(new Animated.Value(-windowWidth)).current;

const flexScrolBar = useRef(new Animated.Value(0)).current;

const AnimatedFirstOpasity = useRef(new Animated.Value(0)).current;

const AnimatedSecondOpasity = useRef(new Animated.Value(1)).current;

const AnimatedFinalOpasity = 10

useEffect(() => {
    
    Animated.timing(finalDisplayRight, {
        toValue: -windowWidth,
        duration: 0,
        useNativeDriver: false
      }).start()  
    Animated.timing(fistDisplayRight, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }).start()
      Animated.timing(secondDisplayRight, {
        toValue: -windowWidth,
        duration: 0,
        useNativeDriver: false
      }).start()  

      Animated.timing(AnimatedFirstOpasity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }).start()  
      Animated.timing(AnimatedSecondOpasity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false
      }).start()  

    //   setDisplayOpasity({

    //     first: 0,
    //     second: 1,
    //     final: 10

    // })

    setActiveButtonNext(false)

    Animated.timing(flexScrolBar, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }).start()  
}, [curent])

const [ displayOpasity, setDisplayOpasity] = useState({

    first: 0,
    second: 1,
    final: 10


})

const scrollIndicatorSize = contentSize > visibleScrollContainer ? (visibleScrollContainer * visibleScrollContainer) / contentSize : visibleScrollContainer

const difference = visibleScrollContainer > scrollIndicatorSize ?  visibleScrollContainer - scrollIndicatorSize : 1

const scrollIndicatorPosition = Animated.multiply(
  scrollIndicator,
  visibleScrollContainer / contentSize
).interpolate({
  inputRange: [0, difference],
  outputRange: [0, difference],
  extrapolate: 'clamp'
});

const closeModal = () => {
    
    navigation.goBack()
    Animated.timing(finalDisplayRight, {
        toValue: -windowWidth,
        duration: 300,
        useNativeDriver: false
      }).start()
      
}



const goFirstDisplay = () => {

   //Запуск звука
    setPlayStatus(false)
    // отключаем кнопки
    setActiveButtonNext(true)
   //проверям если слово последние то 
    if(arrLength.length - 1 === arrLength.second){
        


        let checkDate = new Date()
        let curentDate = checkDate.getTime()
    //Если запуск был с раздела повторений то засчитываем повторение в первый раз  
    if(base){
      if(curent.repeat === 0){
         
        dispatch(refreshRepeat(String(curent.index+1),curent.type,curent.theme,curentDate))
      }
    }else{
      dispatch(refreshRepeat(String(curent.index+1),curent.type,curent.theme,curent.time))
    }
        //Показываем финальный экран
        Animated.timing(finalDisplayRight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
          }).start()
    }else{
        //меняем боковой отступ первого экрана (показываем)
        Animated.timing(fistDisplayRight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
          }).start(()=>{
              //разблокируем кнопку дальше

            setActiveButtonNext(false)
            // меняем боковой отступ второго экрана(убираем)
            Animated.timing(secondDisplayRight, {

                toValue: -windowWidth,
                duration: 1,
                useNativeDriver: false
           
              }

            
            
    
            ).start(()=>{
                //Меняем наложение слоёв чтобы в следующий раз не менять
                // setDisplayOpasity({...displayOpasity,second: 1, first: 0})

                Animated.timing(AnimatedFirstOpasity, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false
                  }).start()  

                  Animated.timing(AnimatedSecondOpasity, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: false
                  }).start()  

                if(arrLength.length - 1 === arrLength.second){
    
                }else{
                // Аниммируем скрол
                    Animated.timing(flexScrolBar, {
                        toValue:  ((arrLength.second + 1) * 1/(arrLength.length/100) )/100 ,
                        duration: 200,
                        useNativeDriver: false
                   
                      }
                     
            
                    ).start()
                    setArrLength({...arrLength,second: arrLength.second + 1})
                }
           
            });
    
          
          });
    }
    
}

const goBackSecondDisplay = () => {
    if(arrLength.first == 0){
        console.log('это конец')
    }else{
    
        Animated.timing(AnimatedFirstOpasity, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false
          }).start(()=>{
            Animated.timing(AnimatedSecondOpasity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false
              }).start(()=>{
        
                setArrLength({...arrLength, second: arrLength.second - 1})
                                  Animated.timing(flexScrolBar, {
                         toValue:  ((arrLength.second - 1) * 1/(arrLength.length/100) )/100 ,
                         duration: 200,
                         useNativeDriver: false
                    
                       }
                      
             
                     ).start(()=>{
                      setPlayStatus(true)
                     })
                Animated.timing(secondDisplayRight, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false
                  }).start(
                    Animated.timing(fistDisplayRight, {
                        toValue: -windowWidth,
                        duration: 200,
                        useNativeDriver: false
                      }).start()  
                  )
                  
              })
          })
          
        }

 
     }

const goBackFirstDisplay = () => {
  setPlayStatus(false)
    Animated.timing(AnimatedFirstOpasity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }).start(()=>{
        setArrLength({...arrLength,first: arrLength.first - 1})
        Animated.timing(fistDisplayRight, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false
          }).start(
            Animated.timing(secondDisplayRight, {
                toValue: -windowWidth,
                duration: 200,
                useNativeDriver: false
              }).start()  
          )
          
      })  
    
 
    //Запуск звука
    //  setPlayStatus(false)
     // отключаем кнопки
    //  setActiveButtonNext(true)
    // //проверям если слово последние то 
    //  if(arrLength.length - 1 === arrLength.second){
         
 
 
    //      let checkDate = new Date()
        
    //      let curentDate = checkDate.getTime()

    //  //Если запуск был с раздела повторений то засчитываем повторение в первый раз  
    //  if(base){
    //    if(curent.repeat === 0){
          
    //      dispatch(refreshRepeat(String(curent.index+1),curent.type,curent.theme,curentDate))
    //    }
    //  }else{
    //    dispatch(refreshRepeat(String(curent.index+1),curent.type,curent.theme,curent.time))
    //  }
    //      //Показываем финальный экран
    //      Animated.timing(finalDisplayRight, {
    //          toValue: 0,
    //          duration: 300,
    //          useNativeDriver: false
    //        }).start()
    //  }else{
    //      //меняем боковой отступ первого экрана (показываем)
    //      Animated.timing(fistDisplayRight, {
    //          toValue: 0,
    //          duration: 300,
    //          useNativeDriver: false
    //        }).start(()=>{
    //            //разблокируем кнопку дальше
 
    //          setActiveButtonNext(false)
    //          // меняем боковой отступ второго экрана(убираем)
    //          Animated.timing(secondDisplayRight, {
 
    //              toValue: -windowWidth,
    //              duration: 1,
    //              useNativeDriver: false
            
    //            }
 
             
             
     
    //          ).start(()=>{
    //              //Меняем наложение слоёв чтобы в следующий раз не менять
    //              // setDisplayOpasity({...displayOpasity,second: 1, first: 0})
 
    //              Animated.timing(AnimatedFirstOpasity, {
    //                  toValue: 0,
    //                  duration: 0,
    //                  useNativeDriver: false
    //                }).start()  
 
    //                Animated.timing(AnimatedSecondOpasity, {
    //                  toValue: 1,
    //                  duration: 0,
    //                  useNativeDriver: false
    //                }).start()  
 
    //              if(arrLength.length - 1 === arrLength.second){
     
    //              }else{
    //              // Аниммируем скрол
    //                  Animated.timing(flexScrolBar, {
    //                      toValue:  ((arrLength.second + 1) * 1/(arrLength.length/100) )/100 ,
    //                      duration: 200,
    //                      useNativeDriver: false
                    
    //                    }
                      
             
    //                  ).start()
    //                  setArrLength({...arrLength,second: arrLength.second + 1})
    //              }
            
    //          });
     
           
    //        });
    //  }
     
 }


const goSecondDisplay = () => {
    setPlayStatus(true)
    setActiveButtonNext(true)
    Animated.timing(secondDisplayRight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
   
      }).start(()=>{
        setActiveButtonNext(false)
        Animated.timing(fistDisplayRight, {
            toValue: -windowWidth,
            duration: 1,
            useNativeDriver: false
          }
        ).start(()=>{
            // setDisplayOpasity({...displayOpasity,second: 0, first: 1})
            Animated.timing(AnimatedFirstOpasity, {
                toValue: 1,
                duration: 0,
                useNativeDriver: false
              }).start()  
              Animated.timing(AnimatedSecondOpasity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false
              }).start()  
            if(arrLength.length - 1 === arrLength.first){

            }else{
                setArrLength({...arrLength,first: arrLength.first + 1})
            }
          
        });
      });


    // setDisplayStyle({
    //     first: {
    //         right: -windowWidth,
    //         zIndex: 1
           
    //     },
    //     second: {
    //         right: 0,
    //         zIndex: 2
    //     }
    // })

}

const giveFontSize = (string,type) => {
  // const status = false
  
  // let maxWidthWord = 0
  // if(type === 'en'){
  //   maxWidthWord = 17
  // }else{
  //   maxWidthWord = 25 
  // }
  // const toBig = (string) => {
  //   return string.length > maxWidthWord
  // }
  // const arr = string.split(' ')
  if(type === 'en'){
    return string.length > 20
  }else{
    return string.length > 25
  }


}

const handleGesture = (evt) =>{
    let{nativeEvent} = evt
       
    console.log(nativeEvent)
        
        if(nativeEvent.translationX < -120){

            goSecondDisplay()

        }
        // if(nativeEvent.translationX > 100){

        //     goFirstDisplay()

        // }
    }

    const handleGesture2 = (evt) =>{
        let{nativeEvent} = evt
         
    
            
            if(nativeEvent.translationX < -120){
    
                goFirstDisplay()
    
            }
            // if(nativeEvent.translationX > 100){
    
            //     goFirstDisplay()
    
            // }
        }
// console.log('wwww', Number(curent.index - 1))
   


    if(curent){

     const   wordArr = data[curent.index]['data']['word'][curent.theme]

    // console.log('BaseCurent', typeof base)


    //     console.log('modalCurent', data[0]['data']['word']["Аэропорт"])
     
  
    //  setArrLength({curent: 0, length:  data[curent.index]['data']['word'][curent.theme].length})

        if(arrLength){
   
        return (


        

                <View style={{flex: 1,position: 'relative'}}>


                <Animated.View style={{...styles.directContainer, top: 0 , right: fistDisplayRight ,height: Platform.OS === 'ios'  ? windowHeight :windowHeight, zIndex: AnimatedFirstOpasity,elevation:AnimatedFirstOpasity }}>
                <FlingGestureHandler  

               enabled={!activeButonNext}

                numberOfPointers={1}

               direction={Directions.LEFT}

               onHandlerStateChange={({ nativeEvent }) => {

                    console.log('state', nativeEvent)
                if (nativeEvent.state === State.ACTIVE ) {
                    console.log("I'm flinged!");
                    goSecondDisplay()
                }
              }}>
                    <FlingGestureHandler  

enabled={!activeButonNext}

 numberOfPointers={1}

direction={Directions.RIGHT}

onHandlerStateChange={({ nativeEvent }) => {

    
 if (nativeEvent.state === State.ACTIVE ) {
    goBackSecondDisplay()
 }
}}>
           <View style={{

                    width: windowWidth, height: windowHeight  - 61,
                    position: 'absolute',
                    zIndex: 1,
                    elevation: 1

                  }}>

           </View>
           </FlingGestureHandler>
</FlingGestureHandler>
    <View style={styles.topContainer}>

    <Image style={{width: windowWidth, height: windowWidth}} source={{uri:wordArr[arrLength.first]['image1']}}>

</Image>

<View style={styles.textWrpaer}>
<Text style={styles.preSpan}> {wordArr[arrLength.first]['en'].indexOf(" ") === -1 ? 'текущее слово' : "текущая фраза"}</Text>
<Text style={{...styles.bigWord,  backgroundColor: '#42a9e0', fontSize: giveFontSize(wordArr[arrLength.first]['ru'],'ru')? 20 : 30 }}>

    {wordArr[arrLength.first]['ru']}
    </Text>

</View>
    </View>



<View style={styles.textWraperBottom}>

   
<Text style={{...styles.preSpan,textAlign: 'center'}}>
   нажмите чтобы открыть перевод
</Text>

<TouchableOpacity disabled={activeButonNext} style={{width: '100%', alignSelf: "flex-end" }} onPress={()=>{goSecondDisplay()}}>

<Text style={{...styles.bottomButton, alignSelf: 'flex-end'}}>

   далее

</Text>

</TouchableOpacity>

</View>




  
   </Animated.View> 




   {/* PEREBORKA@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

   <FlingGestureHandler 
    enabled={!activeButonNext}
               
    numberOfPointers={1}
   direction={Directions.LEFT}
   onHandlerStateChange={({ nativeEvent }) => {

     
    //     console.log('state', State.ACTIVE)
    if (nativeEvent.state === State.ACTIVE ) {
        console.log("I'm flinged!");
       goFirstDisplay()
    }
  }}
  >
 <FlingGestureHandler 
    enabled={!activeButonNext}
               
    numberOfPointers={1}
   direction={Directions.RIGHT}
   onHandlerStateChange={({ nativeEvent }) => {


    //     console.log('state', State.ACTIVE)
    if (nativeEvent.state === State.ACTIVE ) {
        // console.log("Влево!");
        goBackFirstDisplay()
    }
  }}
  >
 <Animated.View style={{...styles.directContainer, top: 0 , right: secondDisplayRight ,height:  Platform.OS === 'ios'  ? windowHeight :windowHeight ,zIndex:AnimatedSecondOpasity , elevation: AnimatedSecondOpasity }}>

      

    <View style={styles.topContainer}>
    <Image style={{width: windowWidth, height: windowWidth}} source={ {uri:wordArr[arrLength.second]['image2']}}>
    </Image>

<View style={{...styles.textWrpaer, zIndex: 100,elevation: 100}}>

<WordSound soundPlay={playStatus} sound={wordArr[arrLength.second]['sound']} en={wordArr[arrLength.second]['en']} tr={wordArr[arrLength.second]['tr']} giveFontSize={giveFontSize} />


{/* <TouchableOpacity onPress={()=> {
console.log('звук')
}}>


<Text style={styles.preSpan}>нажмите чтобы прослушать ещё раз</Text>
<View style={styles.midleButton}>

<View  style={{width: '100%'}} >
<Text style={{...styles.bigWord,paddingVertical: 0,}}>{wordArr[arrLength.second]['en']}</Text>
<Text style={styles.bigWordLight}>{"("+wordArr[arrLength.second]['tr']+ ")"}</Text>
</View>
<View style={{position: 'absolute', right: 20,top: 20}} >
<Ionicons  size={40} color="#fff" name="md-volume-high" />  
</View>

</View>
</TouchableOpacity> */}

</View>

    </View>



   <ScrollView     
   showsVerticalScrollIndicator={false}
   scrollEventThrottle={16}
   onScroll={Animated.event(
     [{ nativeEvent: { contentOffset: { y : scrollIndicator } } }],
     { useNativeDriver: false },
   )}
   onLayout={(e)=>{
     setVisibleScrollContainer(e.nativeEvent.layout.height /100 * 80)
     setVisibleScrollBar(false)

   }}
   onContentSizeChange={(width, height) => {
     setContentSize(height /100 * 80);

   }}
   style={{width: '100%'}} >
        <Text style={styles.underSpanRu} >
 {wordArr[arrLength.second]['ru']}
   </Text>
   <Text style={styles.underSpan} >
 {wordArr[arrLength.second]['image_info']}
   </Text>


</ScrollView>

{ visibleScrollContainer - contentSize >= 0 ? null : 

<View style={{...styles.scrolBarContainer, height: visibleScrollContainer, top: windowWidth +120 }}>
{visibleScrollBar ? null :
       <Animated.View style={{...styles.scrolBar,height: scrollIndicatorSize ,top: scrollIndicatorPosition }} >

       </Animated.View>}

   </View>
}

  

<View style={styles.textWraperBottom}>

   




<TouchableOpacity disabled={activeButonNext} style={{width: '100%', alignSelf: "flex-end" }} onPress = {() => {
goFirstDisplay()
 }}>

<Text style={{...styles.bottomButton, alignSelf: 'flex-end'}}>

   далее

</Text>

</TouchableOpacity>

</View>

   </Animated.View>
   </FlingGestureHandler> 
   </FlingGestureHandler>
   

   <Animated.View style={{...styles.directContainer, top: 0 , right: finalDisplayRight
    // fistDisplayRight 
    ,height: Platform.OS === 'ios'  ? windowHeight :windowHeight , zIndex:AnimatedFinalOpasity
    // displayOpasity.first
    ,
    elevation: AnimatedFinalOpasity ,
   
    width: '100%'
    // displayOpasity.first 
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

    {/* FINAL DISPLAY */}


<View style={{...styles.progBarWrap, top: Platform.OS === 'ios' ? 15 : 15, zIndex: 9,elevation: 3}}>
    
           <View style={styles.progBar}  >
               <Animated.View style={{...styles.barIndicator , flex: flexScrolBar }}>
               </Animated.View>
           </View>

           <TouchableOpacity style={{position: 'absolute', top: 1.5,right: 0,width: '20%' }} onPress={()=>{ navigation.goBack()}}>

            <View style={{height: 47,width: "100%", alignItems: 'center', flexDirection: 'row',} }>
            <Image style={styles.closeButton} source={  require('../../../assets/img/close.png')}></Image>  
            </View>

           </TouchableOpacity>
</View>

  

                </View>
            
  
    
            )

                     
        }
        else {
            return (
                
                null
            )
        }
    }else {
        return (


        

            
       
                <View style={styles.directContainer}>
    
                 <View style={styles.topContainer}>
                 <Image style={{width: windowWidth, height: windowWidth}} source={ require('../../../assets/img/word_test.jpg')}>
    
    </Image>
    
    <View style={styles.textWrpaer}>
       
<TouchableOpacity onPress={()=> {
    console.log('звук')
}}>


    <Text style={styles.preSpan}>нажмите чтобы прослушать ещё раз</Text>
    <View style={styles.midleButton}>

        <View  style={{width: '100%'}} >
        <Text style={{...styles.bigWord,paddingVertical: 0,}}>open</Text>
        <Text style={styles.bigWordLight}>(оупен)</Text>
        </View>
        <View style={{position: 'absolute', right: 20,top: 20}} >
        <Ionicons  size={40} color="#fff" name="md-volume-high" />  
        </View>
          
    </View>
    </TouchableOpacity>
            
    </View>
    
                 </View>


       
                <ScrollView     
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y : scrollIndicator } } }],
                  { useNativeDriver: false },
                )}
                onLayout={(e)=>{
                  setVisibleScrollContainer(e.nativeEvent.layout.height /100 * 80)
                  setVisibleScrollBar(false)
                }}
                onContentSizeChange={(width, height) => {
                  setContentSize(height /100 * 80);
                }}
                style={{width: '100%'}} >
                <Text style={styles.underSpan} >
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                  
                </Text>
             

            </ScrollView>
 
         
            <View style={{...styles.scrolBarContainer, height: visibleScrollContainer, top: windowWidth +120 }}>
{visibleScrollBar ? null :
                    <Animated.View style={{...styles.scrolBar,height: scrollIndicatorSize ,top: scrollIndicatorPosition }} >

                    </Animated.View>}

                </View>
               
    
            <View style={styles.textWraperBottom}>
    
                
            {/* <Text style={{...styles.preSpan,textAlign: 'center'}}>
                нажмите чтобы открыть перевод
            </Text> */}

         
         
            <TouchableOpacity style={{width: '100%', alignSelf: "flex-end" }} onPress = {() => {
             goFirstDisplay()
              }}>
    
            <Text style={{...styles.bottomButton, alignSelf: 'flex-end'}}>
    
                далее1
    
            </Text>
    
            </TouchableOpacity>
    
            </View>
    
    
    
    
             <View style={styles.progBarWrap}>
                        <View style={styles.progBar}  >
                            <View style={styles.barIndicator}>
                            </View>
    
                        </View>
                        <TouchableOpacity style={{   position: 'absolute',
           right: -56,
           top: 11}} onPress={()=>{console.log('хуй')}}>
                        <Image style={styles.closeButton} source={  require('../../../assets/img/close.png')}></Image>  
                        </TouchableOpacity>
                 
                    </View>
               
                </View>
    
    
    
            )
    }



    }
const styles = StyleSheet.create({
    
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
   progBarWrap : {
       width: '100%',
       position: 'absolute',
       height : 50,
       justifyContent: 'center',
       flexDirection: 'row' ,
       alignItems: 'center',
      
 
   },
   closeButton: {
       width: 28,
       height: 28,
       marginLeft: 15
 
    
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
   textWrpaer: {
    width: '100%'
   },
   bigWord: {

    maxWidth: '100%',
    paddingHorizontal: '10%',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'sfUi-bold',
    paddingVertical: 5,
    letterSpacing: 1

   },

   textWraperBottom : {
       width: '100%',
       alignSelf: 'flex-start',
     
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
   topContainer: {
       width: '100%'
   }
   ,
   bigWordLight: {
       fontFamily: 'sf-light',
       fontSize: 16,
       color: '#fff',
       paddingHorizontal: '10%',
       marginBottom: 10
   },
   midleButton: {
    backgroundColor: '#42a9e0',
    color: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
   },
   underSpan : {
    fontFamily: 'sf-light',
    fontSize: 14,
    paddingHorizontal: '10%',
    marginBottom: 10,
   

   },
   scrollContainer: {
       width: '100%',
       position: 'relative' 
   },
   scrolBarContainer: {
       width: 2,
       height: '90%',
       backgroundColor: 'rgba(160, 160, 160,0.2)',
       position: 'absolute',
       right: 20,
       top: 10,
     
   },
   scrolBar : {
       height: '10%',
       width: 2,
       backgroundColor: '#42a9e0',
       position: 'absolute',
       top: 20

   },
   underSpanRu: {
    fontFamily: 'sf-semiB',
    fontSize: 24,
    color: '#000',
    paddingHorizontal: '10%',
    marginBottom: 5,
    marginTop: 4
   }

})