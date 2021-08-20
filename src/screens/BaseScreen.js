import React, {useState , useEffect, useRef} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View,Text,StyleSheet, TouchableOpacity, FlatList,Animated,Dimensions,ActivityIndicator,Image,ScrollView,ImageBackground} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import {THEME}  from '../theme'
import {loadTicher} from '../store/actions/ticher'
import {loadUser,baseRefreshRepeat} from '../store/actions/user'
import ImageModal from 'react-native-image-modal'
import { AppSound } from '../components/ui/AppSound'
import { ModalFinal } from '../components/ui/ModalFinal'
import { BaseModalNext } from '../components/ui/BaseModalNext'
import { ModalFinalPhrase } from '../components/ui/ModalFinalPhrase'
import {MyImage} from '../components/ui/MyImage'
import {MyImageNew} from '../components/ui/myImageNew'
import {Ionicons} from '@expo/vector-icons'
import { AppSoundPhrase } from '../components/ui/AppSoundPhrase'
import {MyModalImage} from '../components/ui/MyModalImage'
import { Asset } from 'expo-asset';
import { BlurView } from 'expo-blur';
import { WordModal } from '../components/ui/WordModal'
import { DialogModal } from '../components/ui/DialogModal'
import {StarModal} from '../components/ui/StarModal'


 

export const BaseScreen = ({navigation}) => {


  // let topFlat
  // console.log('NAV', navigation)

  const goToModal = (testData) => {

    navigation.navigate('MyModal', {
      otherParam: testData,
    })

  }
//       const [tichButton,setTichButton] = useState('Урок 1')

//       const [repetType,setRepeatType] = useState('word')

//       const [replaceWord,setReplaceWord] = useState({})

//       const [modalNextGo,setModalNext] = useState(false)

//       const [repeatCicle,setRepeatCicle] = useState({}) 

//       // setTimeout(setRepeatCicle(JSON.parse(JSON.stringify(allTicher.find(item => item.title === 'Урок 1')))), 1000)

//       const [loadBar,setLoadBar] = useState({base:0,update:0})

//       const [chengeScreen,setchengeScreen] = useState({screen: 'main',dataRepeat: {}})

//       const[finalModal,setFinalModal] = useState(false)

//       const [repeatPoint,setRepeatPoint] = useState(0)

//       // const[modalButonType,setModalButtonType] = useState(false)

//       const [curentRepeat,setCurentRepeat] = useState({})
      
//       const[firstPhrase,setFirstPhrase] = useState(false)

//       const[finalModalPhrase,setFinalModalPhrase] = useState(false)
      
//       const[phraseVision,setPhraseVision] = useState({fadeAnimation: new Animated.Value(1), value: 0 })

//       const[interpreterVision,setInterpreterVision] = useState({fadeAnimation: new Animated.Value(0), value: 0 })


   
//       const sDisp = () => {
//         if(windowHeight < 620){
//           return true
//         }else{
//           return false
//         }
        
//       }

     
      
//       useEffect(() => {

        

//         if(allTicher[0]){

//           setRepeatCicle(JSON.parse(JSON.stringify(allTicher[0])))
//           setTichButton('Урок 1')
          
//         }
//       }, [allTicher])
//       // 
//       const chengeTichRepeatStatus = (titleTich) => {

//         const repaetArr = JSON.parse(JSON.stringify(allTicher.find(item => item.title === titleTich)))
//         setRepeatCicle(repaetArr) 

//       }


//       const fadeAnim = useRef(new Animated.Value(0)).current;



      
//   const interpreterToogle = () => {
//     if(interpreterVision.value == 0){
//       setInterpreterVision({...interpreterVision,value:1})
//       // console.log('гол',interpreterVision.fadeAnimation )
//       ifadeIn()
      
//     }else{
//       setInterpreterVision({...interpreterVision,value:0})
//       ifadeOut()
//       // console.log('штанга',interpreterVision.fadeAnimation )
     

//     }
//   }




//   const ifadePhraOut = () => {
//     Animated.timing(phraseVision.fadeAnimation, {
//       toValue: 0,
//       duration: 2,
//       useNativeDriver: true
//     }).start(({ finished }) => {
//       Animated.timing(phraseVision.fadeAnimation, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true
//       }).start();
//     })
//   };



//   const ifadeIn = () => {
//     Animated.timing(interpreterVision.fadeAnimation, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true
//     }).start();
//   };

//   const ifadeOut = () => {
//     Animated.timing(interpreterVision.fadeAnimation, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true
//     }).start();
//   };


//       const fadeIn = () => {
//         // Will change fadeAnim value to 1 in 5 seconds
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }).start();
//       }

//       const openBaseRepeat = () => {


//         setModalNext(true)
        

//             }

//             const  openWord = (current) => {

              
     
//               setCurentRepeat({...curentRepeat, repeat: 'word', type: current})
    
//               // setRepeatCicle(repeatCicle.data)
    
//               setReplaceWord(repeatCicle.data.word[current][0])
    
//               setLoadBar({
//                 base: repeatCicle.data.word[current].length,
//                 update: repeatCicle.data.word[current].length
//               })
    
//               setModalNext(false)
    
//               setchengeScreen({...chengeScreen,screen: 'word'})
    
//               fadeIn()
            
//           }   

//           const  openPhrase = (current) => {

//             // console.log('открываем фразу', repeatCicle.data.phrase[current][0])
//             // console.log('открываем фразу', repeatCicle.data.phrase)
    
//             setCurentRepeat({...curentRepeat, repeat: 'phrase',type: current})
    
//             // // setRepeatCicle(repeatCicle.data)
    
    
//             setFirstPhrase(repeatCicle.data.phrase[current][0].word)
    
//             setReplaceWord(repeatCicle.data.phrase[current][0])
    
//             setLoadBar({
//               base: repeatCicle.data.phrase[current].length,
//               update: repeatCicle.data.phrase[current].length
//             })
    
//             setModalNext(false)
    
//             setchengeScreen({...chengeScreen,screen: 'phrase'})
    
//             fadeIn()
    
//           }


      


//         const nextPhrase = (status) => {
//             if(repeatCicle.data.phrase.length == 1){
          
//               if(status === true){
                
//                 setRepeatPoint(repeatPoint+2)
                
//                 indexZ()
          
//                 refreshOpasity()
          
                
               
               
//                 // setchengeScreen({...chengeScreen,screen: 'main'})
          
//                 // console.log('закончилось')
          
//                 setchengeScreen({...chengeScreen,screen: 'main'})
//                 setFinalModal(true)
          
//                 // myLoadLine()
          
//               }else{
//                 setRepeatPoint(repeatPoint-1)
//                 let hopas = repeatCicle
//                 // console.log('xz', hopas)
//                 hopas.data.word.push(hopas.data.phrase.shift()) 
//                 indexZ()
//                 setReplaceWord(hopas.data.phrase[0])
//                 refreshOpasity()
//                 // myLoadLine()
          
//               }
//             }else{
              
//           if(status === true){
          
//             setLoadBar({
//              ...loadBar,
//               update: repeatCicle.data.phrase.length
          
//             })

//             setRepeatPoint(repeatPoint+2)

//             let hopas = repeatCicle
          
//             // console.log('xz', hopas)
          
//             hopas.data.phrase.shift()
          
//             indexZ()
          
//             setReplaceWord(hopas.data.phrase[0])
          
//             setLoadBar({
//               ...loadBar,
//                  update: loadBar.update-1
             
//                })
          
//             refreshOpasity()
//             // myLoadLine()
//           }else{
           
//             let hopas = repeatCicle
//                 // console.log('xz', hopas)
//                 hopas.data.word.push(hopas.data.phrase.shift()) 
//                 indexZ()
//                 setReplaceWord(hopas.data.phrase[0])
//                 refreshOpasity()
//                 // myLoadLine()
//                 setRepeatPoint(repeatPoint-1)
//           }
//           }
          
//           }


//  const nextWord = (status) => {
//   if(repeatCicle.data.word[curentRepeat.type].length == 1){

//     if(status === true){
//       if(repeatPoint < 0){
//         setRepeatPoint(0)
//       }else(
//         setRepeatPoint(repeatPoint+1)
//       )
  

//       indexZ()

//       refreshOpasity()

//       // setchengeScreen({...chengeScreen,screen: 'main'})

//       // console.log('закончилось')

//       setchengeScreen({...chengeScreen,screen: 'main'})

//       setFinalModal(true)

//       // myLoadLine()

//     }else{
//       setRepeatPoint(repeatPoint-1)
//       let hopas = repeatCicle
//       // console.log('xz', hopas)
//       hopas.data.word[curentRepeat.type].push(hopas.data.word[curentRepeat.type].shift()) 
//       indexZ()
//       setReplaceWord(hopas.data.word[curentRepeat.type][0])
//       refreshOpasity()
//       // myLoadLine()

//     }
//   }else{
    
// if(status === true){

//   setLoadBar({
//   ...loadBar,
//     update: repeatCicle.data.word.length

//   })
//   setRepeatPoint(repeatPoint+1)
//   let hopas = repeatCicle

//   // console.log('xz', hopas)

//   hopas.data.word[curentRepeat.type].shift()

//   indexZ()

//   setReplaceWord(hopas.data.word[curentRepeat.type][0])

//   setLoadBar({
//     ...loadBar,
//       update: loadBar.update-1
  
//     })

//   refreshOpasity()
//   // myLoadLine()
// }else{
//   // console.log(repeatCicle)
//   let hopas = repeatCicle
//       // console.log('xz', hopas)
//       hopas.data.word[curentRepeat.type].push(hopas.data.word[curentRepeat.type].shift()) 
//       indexZ()
//       setReplaceWord(hopas.data.word[curentRepeat.type][0])
//       refreshOpasity()
//       // myLoadLine()
//       setRepeatPoint(repeatPoint-1)
// }
// }
          
//           }



          
//           const closeFinalModal = () => {
//             dispatch(baseRefreshRepeat(repeatPoint))
//             setRepeatCicle(JSON.parse(JSON.stringify(allTicher.find(item => item.title === 'Урок 1'))))
//             setTichButton('Урок 1')
//             setReplaceWord({})
//             setLoadBar({base:0,update:0})
//             setFinalModal(false)
//             setRepeatPoint(0)
           
//           }
          
//           const closeFinalModalPhrase = () => {
           
//             setRepeatCicle(JSON.parse(JSON.stringify(allTicher.find(item => item.title === 'Урок 1'))))
//             setTichButton('Урок 1')
//             setReplaceWord({})
//             setLoadBar({base:0,update:0})
//             setFinalModal(false)
//             setRepeatPoint(0)
//           }

          


// ///Логика Карточки 


// const animatedValue = new Animated.Value(0);
     
// let myValues = 0
// animatedValue.addListener(({ value }) => {
//     myValues = value
// })
// const frontInterpolate = animatedValue.interpolate({
//   inputRange: [0, 180],
//   outputRange: ['0deg', '180deg'],
// })
// const backInterpolate = animatedValue.interpolate({
//   inputRange: [0, 180],
//   outputRange: ['180deg', '360deg']
// })
// const frontOpacity = animatedValue.interpolate({
//   inputRange: [89, 90],
//   outputRange: [1, 0]
// })
// const frontHeight = animatedValue.interpolate({
//   inputRange: [0, 400 ],
//   outputRange: [400, 0]
// })
// const backOpacity = animatedValue.interpolate({
//   inputRange: [89, 90],
//   outputRange: [0, 1]
// })

// let ZetIndex = 0;

// const   flipCard = (alert) => {
// if (myValues >= 90) {
//   // console.log('1.1')
//   Animated.spring(animatedValue,{
//     toValue: 0,
//     friction: 8,
//     tension: 10,
//     useNativeDriver: true,
//   }).start();

 
  
// } else {
//   // console.log('1.2')
//   Animated.spring(animatedValue,{
//     toValue: 180,
//     friction: 8,
//     tension: 10,
//     useNativeDriver: true,
//   }).start();
// }

// }

// const indexY = () => {
// indexX.setNativeProps({
// zIndex: 1
// })
// }

// const indexZ = () => {
// indexX.setNativeProps({
//   zIndex: 3
//  })
// }
// const refreshOpasity  = () => {
//   rOpasity.setNativeProps({
//     opacity: 0
//    })
//   }
//   // const myLoadLine  = () => {
//   //   mLoadLine.setNativeProps({
//   //     flex: (105 -  (repeatCicle.data.word.length * ( 1/(repeatCicle.data.word.length / 100))) )/ 100
//   //   }
//   //   )}
// const frontAnimatedStyle = {
// transform: [
//   { rotateY: frontInterpolate }
// ]
// }
// const backAnimatedStyle = {
// transform: [
//   { rotateY: backInterpolate }
// ]
// }
// //Логика карточки

// // console.log('загрузка юзера', ! )

// function tichRenderFilter (title,indexs){

//     let  indexTitle = 'Урок ' + indexs

//     if(title === 'Урок 1'){

//         // setRepeatCicle(allTicher[0])
//         // setRepeatCicle(JSON.parse(JSON.stringify(allTicher[0])))
//         return true

//     }else{

//         if(allUser.accessRepeat[title] ){
//             return true
//           }else{
//             return false
//           }

//     }
    
// }


// const goNextP = () => {

   
    
//   let hopas = repeatCicle
  
//   if(hopas.data.phrase[curentRepeat.type][1].word === firstPhrase){

//     setFinalModalPhrase(true)

//     // console.log('конец')
//     // fadePhraIn()
//   }else{
//     setLoadBar({
//       ...loadBar,
//         update: loadBar.update-1

//       })
//     ifadePhraOut()
//     hopas.data.phrase[curentRepeat.type].push(hopas.data.phrase[curentRepeat.type].shift()) 

//     setReplaceWord(hopas.data.phrase[curentRepeat.type][0])
//     // fadePhraIn()
//   }
//   // console.log('текущий репит',curentRepeat.type) 


// }



// const goPrevP = () => {

//   let hopas = repeatCicle

 
//   if(hopas.data.phrase[curentRepeat.type][0].word === firstPhrase){
//     console.log('начало')
 
//   }else{
//     ifadePhraOut()
//     hopas.data.phrase[curentRepeat.type].unshift(hopas.data.phrase[curentRepeat.type].pop()) 

//     setReplaceWord(hopas.data.phrase[curentRepeat.type][0])

//     setLoadBar({
//       ...loadBar,
//         update: loadBar.update+1
    
//       })

//   }

// }











// if (!allUser.repeat || !allTicher[2] || !repeatCicle ){



  
//   return ( 
  
//   <View style={styles.loadingContainer}>

// <ActivityIndicator size="large" color="#3A9FE7"  />  

//   </View> 

// )

  
// }else{



//         if(chengeScreen.screen === 'main'){
          
// return (

//   <View style={styles.directWraper}>  


// {typeof repeatCicle == 'object'?<BaseModalNext
// visible={modalNextGo}  type={repetType} Press={() => {setModalNext(false)} } tichTitle={tichButton} dataList={repeatCicle} openWord={openWord} openPhrase={openPhrase} 

// /> : null }
//     <ModalFinal visible={finalModal} myClose={closeFinalModal} points={repeatPoint}  />  
//     <View style={{...styles.wraperTue,marginTop: 0,paddingVertical: sDisp()?15:30}}>
//        <FlatList style={styles.wraper} horizontal showsHorizontalScrollIndicator={false}  data={allTicher} keyExtractor={post => post.id.toString() } 
// renderItem={({item,index}) => ( 

//     tichRenderFilter(item.title,index) ? 
    
//   <TouchableOpacity onPress={()=> {
//     setTichButton(item.title)
//     chengeTichRepeatStatus(item.title)   
// }} style={{marginHorizontal: 10, }}>

// <Text style={{...styles.tichButton,color:tichButton === item.title? '#fff' : '#3A9FE7',backgroundColor: tichButton === item.title? '#3A9FE7' : '#fff',
// fontSize: sDisp() ? 16 : 18, minWidth: sDisp() ? 100 : 140
// }}>
// {item.title}
// </Text>

// </TouchableOpacity> : null

// )}/>
// </View>

// <View style={{...styles.wraperTue,justifyContent: "space-around",paddingVertical: sDisp()?15:30,marginTop: sDisp()?20:30}}>

// <TouchableOpacity onPress={()=> {setRepeatType('word')}}>
// <Text style={{...styles.tichButton,color:repetType === 'word' ? '#fff' : '#3A9FE7',backgroundColor: repetType === 'word'? '#3A9FE7' : '#fff',
// fontSize: sDisp() ? 16 : 18, minWidth: sDisp() ? 100 : 140
// }}>
// Cлова
// </Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={()=> {setRepeatType('phrase')}}>
// <Text style={{...styles.tichButton,color:repetType === 'phrase'? '#fff' : '#3A9FE7',backgroundColor: repetType === 'phrase'? '#3A9FE7' : '#fff',
// fontSize: sDisp() ? 16 : 18, minWidth: sDisp() ? 100 : 140
// }}>
// Фразы
// </Text>
// </TouchableOpacity>
    
// </View>


// <TouchableOpacity onPress={()=>{openBaseRepeat(tichButton)}}>
//     <Text style={{...styles.goButton,fontSize: sDisp() ? 16 : 20,paddingVertical: sDisp() ? 10 : 15,paddingHorizontal: sDisp() ? 20:40,width: sDisp() ? "50%" : "65%" }}>
//         Повторять
//     </Text>
// </TouchableOpacity>


//   </View>
// )


//         }

//         if(chengeScreen.screen === 'word'){

// return (

//   <View style={styles.actionDirectWraper}>  
//   <View style={{}}>
//   <View style={{...styles.containerLoad, height: sDisp() ? 5 : 10, marginTop:sDisp() ? 10 : 10,marginBottom:sDisp() ? 5 : 10}}>

//     <View  style={{...styles.lineLoad,flex: 1 - (loadBar.update* 1/(loadBar.base/100) )/100 , height: sDisp() ? 7 : 10 }}></View>

//   </View>
//   </View>

//   <View style={{height: '92%'}}>

//             <Animated.View ref={component => {  rOpasity = component}}  style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity:  backOpacity , zIndex : 2}]} >
//             <Text style={{...styles.actionBigWord, fontSize: sDisp() ? 24 : 32}}>{replaceWord.word}</Text>
//             <View style={{...styles.actionContentWraper}}>
          
//                   {/* <Text style={styles.actionTranscription}>{replaceWord.trans}</Text> */}
//                   <TouchableOpacity style={{backgroundColor: '#fff' }} >
//                     <ImageModal
//                     resizeMode="contain"
//                     style={{...styles.activeImage,width: windowWidth / 100 * 65,height: windowWidth / 100 * 55 }} 
//                     source = {{
//                       uri: replaceWord.image,
//                     }} 
//                     imageBackgroundColor={'#fff'}
//                     />
//                       {/* <MyModalImage url={replaceWord.image} /> */}
//                   </TouchableOpacity>

//               </View>

//           <View style={styles.actionButtonBlock}>
//           <AppSound sound={replaceWord.sound} stateEfect={repeatPoint}/>
//           <View style={styles.activeButonContainer}>

//   <TouchableOpacity style={{...styles.activeButonItemTouch,backgroundColor:'#9E8AE3',height: sDisp() ? 36 : 55  }}  onPress={() => {
//     nextWord(false) 
//   }}>
//     <Text style={{...styles.activeButonItem, fontSize: sDisp() ? 14 : 18 }}>
//       Не помню
//     </Text>
//   </TouchableOpacity>

//   <TouchableOpacity  style={{...styles.activeButonItemTouch,height: sDisp() ? 36 : 55 }}  onPress={() => { nextWord(true) }}>
//     <Text style={{...styles.activeButonItem, fontSize: sDisp() ? 14 : 18 }}>
//       Помню
//     </Text>
//   </TouchableOpacity>

//   </View>
//           </View>


          
      

          
          
//             </Animated.View>

//             <Animated.View ref={component => { indexX = component }}   style={[styles.flipCard, frontAnimatedStyle, {opacity: frontOpacity},{zIndex:  3 }]}>
//             <View style={{...styles.actionContentWraper,height: '80%',justifyContent: 'center'}} >

// <Text style={{...styles.actionBigWord,fontSize: sDisp() ? 24 : 32}}>{replaceWord.phrase}</Text>
// <Text style={{...styles.actionBigWord,fontSize: sDisp() ? 24 : 32,color: '#9E8AE3'}}>{replaceWord.trans}</Text>  
// </View>
//   <TouchableOpacity   onPress={() => {flipCard(true)
//   indexY()
//   }} style={{width: '75%',borderRadius: 20,overflow: 'hidden'}} >

//       <Text style={{...styles.actionFirstButton, fontSize: sDisp()? 16: 20}}>
//           Показать ответ
//       </Text>
 
//   </TouchableOpacity>

//   </Animated.View>






        
//             </View> 
        
//             </View>


//   )  }


//         if(chengeScreen.screen === 'phrase'){

//             return ( 
  
//   <View style={styles.actionDirectWraper}>
//  <ModalFinalPhrase visible={finalModalPhrase} myClose={()=>{ setchengeScreen({...chengeScreen,screen: 'main'})
//     setFinalModalPhrase(false)
//    closeFinalModalPhrase()
//   }
   
//    } points={repeatPoint} closeModal={()=>{ setFinalModalPhrase(false)}} /> 
//   <View>

 
//   <View style={{...styles.containerLoad, height: sDisp() ? 5 : 10, marginTop:sDisp() ? 5 : 10,marginBottom:sDisp() ? 5 : 10}}>

//   <View  style={{...styles.lineLoad,flex: 1 - (loadBar.update* 1/(loadBar.base/100) )/100, height: sDisp() ? 7 : 10 }}>
//   </View>

//   </View>
  
//   </View>
//   <View style={{height: '100%',paddingHorizontal: '5%'}} >
// <View style={styles.phraWraper}> 

//   <Animated.View style={{...styles.phraItem, opacity: phraseVision.fadeAnimation}}>
//   {/* <MyImage url={replaceWord.image} />  */}
//   <MyImageNew url={replaceWord.image} /> 
//     <View style={{...styles.mesContainerLeft,  paddingHorizontal: sDisp() ? 15 : 20,paddingVertical: sDisp()? 5:10,minHeight: sDisp() ? 60 : 80 }}>
//     <Text style={{...styles.textColorLeft, fontSize: sDisp() ? 16 : 18 }}>{replaceWord.word}</Text>
//     {/* <Image style={{width: 41,height: 18,position: 'absolute',bottom: -15.5,left:-4}} source={require('../image/3333.png')}></Image> */}
//     </View>



//       <Animated.View style={{opacity: interpreterVision.fadeAnimation}}>

//         <View style={{...styles.mesContainerRight, paddingHorizontal: sDisp() ? 15 : 20,paddingVertical: sDisp()? 5:10,minHeight: sDisp() ? 60 : 80 }}>

//         <Text style={{...styles.textColorRight, fontSize: sDisp() ? 16 : 18 }}>{replaceWord.phrase}</Text>
//         {/* <Image style={{width: 41,height: 18,position: 'absolute',bottom: -15.5,right:-4}} source={require('../image/4444.png')}></Image> */}
//         </View>

//       </Animated.View>
//   </Animated.View>

//   <View style={{width: '100%',alignItems: 'center',marginBottom: 10}}>
//     <View style={{...styles.phraButtonWraper,marginBottom: sDisp() ? 10 : 20}}>




//   <View >

// <TouchableOpacity   onPress={() => {interpreterToogle()}} style={{width: sDisp() ? 35:45,height: sDisp() ? 35: 45}} >

// <View style={{...styles.icon2,width: sDisp() ? 35:45,height: sDisp() ? 35: 45}}>

//   <Ionicons name={"ios-globe"} size={sDisp()? 25:35} color="#fff" />

//   </View>
      
// </TouchableOpacity>

// </View>

//       <View style={{...styles.phraButtonCenter}} >

// <View>

// <TouchableOpacity   onPress={() => {goPrevP()}} style={{width: sDisp() ? 45:65,height: sDisp() ? 45: 65}} >

// <View style={{...styles.icon,width: sDisp() ? 45:65,height: sDisp() ? 45: 65}}>
//   <Ionicons name={"md-arrow-round-back"} size={sDisp() ? 28:50} color="#fff" />
  
//   </View>     
// </TouchableOpacity>
// </View>

// <View>
// <TouchableOpacity   onPress={() => {goNextP()}} style={{width: sDisp() ? 45:65,height: sDisp() ? 45: 65}} >
//   <View style={{...styles.icon,width: sDisp() ? 45:65,height: sDisp() ? 45: 65}}>
// <Ionicons name={"md-arrow-round-forward"} size={sDisp() ? 28:50} color="#fff" />
// </View>
//   </TouchableOpacity>
// </View>
 

//       </View>
//       <AppSoundPhrase sound={replaceWord.sound} stateEfect={repeatPoint}/>
//     </View>
//   </View>

// </View>

      

    {/* <Animated.View ref={component => {  rOpasity = component}}  style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity:  backOpacity , zIndex : 2}]} >
    <Text style={styles.actionBigWord}>{replaceWord.word}</Text>
    <View style={{...styles.actionContentWraper, }}>
      </View>

  

        <View style={styles.actionButtonBlock}>
          <AppSound sound={replaceWord.sound} stateEfect={repeatPoint}/>
          <View style={styles.activeButonContainer}>

  <TouchableOpacity style={{...styles.activeButonItemTouch,backgroundColor:'#9E8AE3' }}  onPress={() => {
   nextPhrase(false) 
  }}>
    <Text style={styles.activeButonItem}>
      Не помню
    </Text>
  </TouchableOpacity>

  <TouchableOpacity  style={styles.activeButonItemTouch}  onPress={() => {  nextPhrase(true)}}>
    <Text style={styles.activeButonItem}>
      Помню
    </Text>
  </TouchableOpacity>

  </View>
          </View>

    </Animated.View> */}

    {/* <Animated.View ref={component => { indexX = component}}   style={[styles.flipCard, frontAnimatedStyle, {opacity: frontOpacity},{zIndex:  3 }]}>
  <View style={styles.actionContentWraper} >

  <Text style={styles.actionBigWord}>{replaceWord.phrase}</Text>

  </View>
  <TouchableOpacity   onPress={() => {flipCard(true)
  indexY()
  }} style={{width: '75%',borderRadius: 20,overflow: 'hidden'}} >
  <Text style={styles.actionFirstButton}>
  Показать ответ
  </Text>
  </TouchableOpacity>
  </Animated.View> */}




  //   </View> 

  // </View> 

//   )


            
//         }


      
// }


// core load data 
const dispatch = useDispatch()
    
useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

useEffect(() => {
    dispatch(loadTicher())
  }, [dispatch])




  
  const allUser = useSelector(state => state.user.allUser)

  const allTicher = useSelector(state => state.ticher.allTicher)



  //   const allUser =  JSON.parse(JSON.stringify(useSelector(state => state.user.allUser)))

  // const allTicher =  JSON.parse(JSON.stringify(useSelector(state => state.ticher.allTicher)))
  const isEmpityObj = (obj) => {
    for (let key in obj) {
      // если тело цикла начнет выполняться - значит в объекте есть свойства
      return false;
    }
    return true;
  }
 
  if( !isEmpityObj(allUser) ) {

    // console.log('statka',allUser.repeat)
  
// logik app const 
// после какого повторения открываеться слудующий урок

const scrollToBlock = (data,index) => {
  let curentIndex = data.findIndex(item => item.repeat == index && item.block == false)

  if(curentIndex >= 0){
    console.log('хуйня работает', curentIndex )
    return curentIndex 
  }else{
    return scrollToBlock(data,index + 1)
  }
      
}


const repeatIterationOpen = 1



const [buttonHistory,setButtonHistory] = useState({
  autoplay: false,
  level: 1
})

const changeButtonHistory = (flag) => {
  setButtonHistory(flag)
}
// scrol bar state / const 1//
const [contentSize, setContentSize] = useState(1);

const [visibleScrollContainer, setVisibleScrollContainer] = useState(windowWidth);

const scrollIndicator = useRef(new Animated.Value(0)).current;

const [visibleScrollBar, setVisibleScrollBar] = useState(true);  

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
// scrol bar state 1//

// scrol bar state 2//

const [contentSize2, setContentSize2] = useState(1);

const [visibleScrollContainer2, setVisibleScrollContainer2] = useState(windowWidth);

const scrollIndicator2 = useRef(new Animated.Value(0)).current;

const [visibleScrollBar2, setVisibleScrollBar2] = useState(true);  


const scrollIndicatorSize2 = contentSize2 > visibleScrollContainer2 ? (visibleScrollContainer2 * visibleScrollContainer2) / contentSize2 : visibleScrollContainer2

const difference2 = visibleScrollContainer2 > scrollIndicatorSize2 ?  visibleScrollContainer2 - scrollIndicatorSize2 : 1


const scrollIndicatorPosition2 = Animated.multiply(
  scrollIndicator2,
  visibleScrollContainer2 / contentSize2
).interpolate({
  inputRange: [0, difference2],
  outputRange: [0, difference2],
  extrapolate: 'clamp'
});

// scrol bar state 2//

//Style const //


const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;



useEffect(() => {

  const scrollToBlock = (data) => {

    console.log("индекс", data.findIndex(item => item.repeat == 3))

    return data.findIndex(item => item.repeat == 0 && item.block == false)

  }

  

  console.log('скролл-эфект')
if(botFlatReady){
  this.botFlat.scrollToIndex({animated: false, index: 4,viewOffset: windowWidth/100*10})
}else{
  console.log('hui a ne scrol')
}

if(topFlatReady){
  this.topFlat.scrollToIndex({animated: false, index: 5,viewOffset: windowWidth/100*10})
}
else{
  console.log('hui a ne scrol2')
}


}, [topFlatReady,botFlatReady ])




const deviceHeightConst =  windowHeight - (windowWidth/100*30) - (windowWidth/100*30/100*70) - 280

const deviceHeightBottomImg = windowWidth/100*30/100*70

//Style const //

//Modal State //

const [wordModal,setWordModal] = useState(false)

const [dialogModal, setDialogModal] = useState(false)

const [starModal,setStarModal] = useState(false)

const goWordModal = (boolean) => {

  setWordModal(boolean)

}

const goDialogModal = (boolean) => {

  setDialogModal(boolean)

}

const goStarModal = (boolean) => {

  setStarModal(boolean)

}

const [ curentWord, setCurentWord ] = useState(false)

const [ curentDialog, setCurentDialog ] = useState(false)

const [topFlatReady,setTopFlatReady] = useState(false)

const [botFlatReady,setBotFlatReady] = useState(false)

// const wordArr = []


//     for(let key in allTicher){
//       const idTich  = allTicher[key]['id']
//       // console.log('название урока', allTicher[key]["data"]['word'])
//      for(let go in allTicher[key]["data"]['word']) {
     
//         wordArr.push({
//           id: idTich,
//           title: go,
//           idFlat: `${idTich}_${go}`,
//         })
//      }
  
//     }







    const  filterData = (data, type) => {
      const getRepeatStatus = (obj) => {

        const myObj = obj

        let result = true

        for(var key in myObj){
           
              if(myObj[key]['repeat'] < repeatIterationOpen){

        
                return false
              }
            
            
        }

        return result

      }

      const getStarImg = (idTich,type,title) => {
        const repeatRef  = allUser.repeat[idTich][type][title]['repeat']

        if(repeatRef ===  0 ){
          return require('../../assets/img/star_1.png')
        }else if(repeatRef ===  1){
          return require('../../assets/img/star_2.png')
        }else if(repeatRef ===  2){
          return require('../../assets/img/star_3.png')
        }else if(repeatRef ===  3){
          return require('../../assets/img/star_4.png')
        }else if(repeatRef ===  4){
          return require('../../assets/img/star_5.png')
        }else if(repeatRef ===  5){
          return require('../../assets/img/star_6.png')
        }else {

          return require('../../assets/img/star_6.png')
        }
      }

       const getTimeItem = (id,type,title) =>{
          return allUser.repeat[id][type][title]['time']
       }

      const getFinalState = (id,type) => {
          
          let valueArr = []
          let maxValue = 0
          const checkDataRef = allUser.repeat[id][type]
          for(key in checkDataRef){
            for(var key2 in checkDataRef[key]){
            
              valueArr.push(checkDataRef[key]['time'])
            }
          }
          const filterValueArr =  valueArr.filter(value => value > maxValue)
          
          if (valueArr.length - filterValueArr.length === 1 ){
            return true
          }else{
            return false
          }
      }
      
      const blockData = (id) => {
        
            const checkDataRef = allUser.repeat[id - 1]
       
          if(id === '1'){

            return false

          }
        else if (getRepeatStatus(checkDataRef['word']) && getRepeatStatus(checkDataRef['phrase'])){

          return false

        }
        else {
          return true
        }
      } 

      const getBgCardObj = {
        1:{
          word: '#eb5e0b',
          phrase: '#392854'
        },
        2:{
          word: '#58c40a',
          phrase: '#133954'
        },
        3:{
          word: '#0b9feb',
          phrase: '#0a6619'
        },
        4:{
          word: '#e71bc3',
          phrase: '#908619'
        },
        5:{
          word: '#6f10e4',
          phrase: '#903819'
        },
        6:{
          word: '#19d9e0',
          phrase: '#09646f'
        },
        7:{
          word: '#f10d58',
          phrase: '#6d0e1e'
        },
        8:{
          word: '#154dec',
          phrase: '#671174'
        },
        9:{
          word: '#f1ee13',
          phrase: '#2e2e71'
        },
      }

      const getCardImgObj = {
        'Аэропорт': require('../../assets/cardimg/01c.jpg'),
        'Стойка регистрации': require('../../assets/cardimg/02c.jpg'),
        'Таможня': require('../../assets/cardimg/03c.jpg'),
        'Таможенный контроль': require('../../assets/cardimg/04c.jpg'),
        'Объявления в Аэропорту': require('../../assets/cardimg/05c.jpg'),
        'Рейс задерживается': require('../../assets/cardimg/06c.jpg'),
        'В самолёте': require('../../assets/cardimg/07c.jpg'),
        'Потеря багажа': require('../../assets/cardimg/08c.jpg'),
        'Ситуации в аэропорту': require('../../assets/cardimg/09c.jpg'),
        'Покупка билета в аэропорту': require('../../assets/cardimg/10c.jpg'),
        'Где транспорт?': require('../../assets/cardimg/11c.jpg'),
        'Как добраться до ЖД станции?': require('../../assets/cardimg/12c.jpg'),
        'Вызов такси': require('../../assets/cardimg/13c.jpg'),
        'Транспорт': require('../../assets/cardimg/14c.jpg'),
        'Бронирование отеля': require('../../assets/cardimg/15c.jpg'),
        'Регистрация в отеле': require('../../assets/cardimg/16c.jpg'),
        'Что есть в отеле': require('../../assets/cardimg/17c.jpg'),
        'Звонок на ресепшен': require('../../assets/cardimg/18c.jpg'),
        'Выселение': require('../../assets/cardimg/19c.jpg'),
        'Улица': require('../../assets/cardimg/20c.jpg'),
        'Знакомства': require('../../assets/cardimg/21c.jpg'),
        'Шоппинг': require('../../assets/cardimg/22c.jpg'),
        'Магазин': require('../../assets/cardimg/23c.jpg'),
        'Достопримечательности': require('../../assets/cardimg/24c.jpg'),
        'Бронирование столика': require('../../assets/cardimg/25c.jpg'),
        'Порекомендуйте ресторан': require('../../assets/cardimg/26c.jpg'),
        'На входе в ресторан': require('../../assets/cardimg/27c.jpg'),
        'Заказ официанту': require('../../assets/cardimg/28c.jpg'),
        'В Банке': require('../../assets/cardimg/29c.jpg'),
        'Запись к Дантисту': require('../../assets/cardimg/30c.jpg'),
        'Регистратура': require('../../assets/cardimg/31c.jpg'),
        'У Врача': require('../../assets/cardimg/32c.jpg'),
        'Команды Врача': require('../../assets/cardimg/33c.jpg'),
        'Жалобы': require('../../assets/cardimg/34c.jpg'),
        'В аптеке': require('../../assets/cardimg/35c.jpg'),
      }


      const getIconObj = {
        'Аэропорт': require('../../assets/icon/01a.png'),
        'Стойка регистрации': require('../../assets/icon/02a.png'),
        // 'Таможня': require('../../assets/icon/03a.png'),
        'Таможенный контроль': require('../../assets/icon/04a.png'),
        'Объявления в Аэропорту': require('../../assets/icon/05a.png'),
        // 'Рейс задерживается': require('../../assets/icon/06a.png'),
        'В самолёте': require('../../assets/icon/07a.png'),
        // 'Потеря багажа': require('../../assets/icon/08a.png'),
        'Ситуации в аэропорту': require('../../assets/icon/09a.png'),
        // 'Покупка билета в аэропорту': require('../../assets/icon/10a.png'),
        // 'Где транспорт?': require('../../assets/icon/11a.png'),
        // 'Как добраться до ЖД станции?': require('../../assets/icon/12a.png'),
        // 'Вызов такси': require('../../assets/icon/13a.png'),
        // 'Транспорт': require('../../assets/icon/14a.png'),
        // 'Бронирование отеля': require('../../assets/icon/15a.png'),
        'Регистрация в отеле': require('../../assets/icon/16a.png'),
        // 'Что есть в отеле': require('../../assets/icon/17a.png'),
        // 'Звонок на ресепшен': require('../../assets/icon/18a.png'),
        // 'Выселение': require('../../assets/icon/19a.png'),
        'Улица': require('../../assets/icon/20a.png'),
        'Знакомства': require('../../assets/icon/21a.png'),
        // 'Шоппинг': require('../../assets/icon/22a.png'),
        'Магазин': require('../../assets/icon/23a.png'),
        // 'Достопримечательности': require('../../assets/icon/24a.png'),
        // 'Бронирование столика': require('../../assets/icon/25a.png'),
        // 'Порекомендуйте ресторан': require('../../assets/icon/26a.png'),
        // 'На входе в ресторан': require('../../assets/icon/27a.png'),
        // 'Заказ официанту': require('../../assets/icon/28a.png'),
        // 'В Банке': require('../../assets/icon/29a.png'),
        // 'Запись к Дантисту': require('../../assets/icon/30a.png'),
        // 'Регистратура': require('../../assets/icon/31a.png'),
        // 'У Врача': require('../../assets/icon/32a.png'),
        // 'Команды Врача': require('../../assets/icon/33a.png'),
        // 'Жалобы': require('../../assets/icon/34a.png'),
        // 'В аптеке': require('../../assets/icon/35a.png'),
        'Местоимения': require('../../assets/icon/01n.png'),
        'Аэропорт выражения': require('../../assets/icon/02n.png'),
        'Вопросы': require('../../assets/icon/03n.png'),
        'Регистрация выражения': require('../../assets/icon/04n.png'),
        'Числительные': require('../../assets/icon/05n.png'),
        'Таможня выражения': require('../../assets/icon/06n.png'),
        'Объявления в Аэропорту фразы': require('../../assets/icon/07n.png'),
        'В самолёте выражения': require('../../assets/icon/08n.png'),
        'Ситуации в аэропорту выражения': require('../../assets/icon/10n.png'),
        'Транспорт часть 1': require('../../assets/icon/11n.png'),
        'Транспорт часть 1 выражения': require('../../assets/icon/12n.png'),
        'Транспорт часть 2': require('../../assets/icon/13n.png'),
        'Транспорт часть 2 выражения': require('../../assets/icon/14n.png'),
        'Отель': require('../../assets/icon/15n.png'),
        'Дни Недели': require('../../assets/icon/16n.png'),
        'Отель выражения': require('../../assets/icon/17n.png'),
        'Ресепшн': require('../../assets/icon/18n.png'),
        'Ресепшн выражения': require('../../assets/icon/19n.png'),
      
        'Улица выражения': require('../../assets/icon/21n.png'),
        'Знакомства выражения': require('../../assets/icon/22n.png'),
        'Магазин выражения': require('../../assets/icon/23n.png'),
        'Ресторан': require('../../assets/icon/24n.png'),
        'Ресторан выражения': require('../../assets/icon/25n.png'),
        'У врача часть 1': require('../../assets/icon/26n.png'),
        'У врача часть 1 выражения': require('../../assets/icon/27n.png'),
        'У врача часть 2': require('../../assets/icon/28n.png'),
        'У врача часть 2 выражения': require('../../assets/icon/28n.png'),
      }
      const styleData = (id) => {
        
        if(id === '1'){
          return {
            color: '#392854',
            img: type === 'word' ? 
            require('../../assets/img/word_img_1.png') :
            require('../../assets/img/phrase_img_1.jpg'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
         else if (id === '2'){
          return {
            color: '#133954',
            img: type === 'word' ? 
            require('../../assets/img/word_img_2.png') :
            require('../../assets/img/phrase_img_2.jpg'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === '3'){
          return {
            color: '#0a6619',
            img: type === 'word' ? 
            require('../../assets/img/word_img_3.png') :
            
            require('../../assets/img/phrase_img_3.jpg'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === '4'){
          return {
            color: '#fff',
            img: type === 'word' ?    
            require('../../assets/img/word_img_1.png') :
            
            require('../../assets/img/word_img_1.png'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === '5'){
          return {
            color: '#fff',
            img: type === 'word' ? 
            require('../../assets/img/word_img_1.png') :
            require('../../assets/img/word_img_1.png'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === '6'){
          return {
            color: '#fff',
            img: type === 'word' ? 
            require('../../assets/img/word_img_1.png') :
            
            require('../../assets/img/word_img_1.png'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === '7'){
          return {
            color: '#fff',
            img: type === 'word' ? 
            require('../../assets/img/word_img_1.png') :
            
            require('../../assets/img/word_img_1.png'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === "8"){
          return {
            color: '#fff',
            img: type === 'word' ? 
            require('../../assets/img/word_img_1.png') :
            
            require('../../assets/img/word_img_1.png'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }
        else if (id === '9'){
          return {
            color: '#fff',
            img: type === 'word' ? 
            require('../../assets/img/word_img_1.png') :
            
            require('../../assets/img/word_img_1.png'),
            bg: require('../../assets/img/test_dialog_bg_img.png')
          }
        }

      }

      const Arr = []

      for(let key in data){
        const idTich  = data[key]['id']
        // console.log('название урока', allTicher[key]["data"]['word'])
       for(let go in data[key]["data"][type === 'word'? 'word': "phrase"]) {
       
          Arr.push({  
            id: idTich,
            title: go,
            idFlat: `${idTich}_${go}`,
            color: getBgCardObj[idTich][type],
            icon: getIconObj[go] ? getIconObj[go] : require('../../assets/icon/01a.png'),
            img : getCardImgObj[go],
            block: blockData(idTich),
            final: getFinalState(idTich,type),
            time: getTimeItem(idTich,type,go),
            type: type,
            repeat: allUser.repeat[idTich][type][go]['repeat'],
            star: getStarImg(idTich,type,go)
            
          })
       }
    
      }

      return Arr    
   }



const giveFontSize = (string) => {
 
  const maxWidthWord = 8
  const toBig = (string) => {
    return string.length > maxWidthWord
  }
  const arr = string.split(' ')

  return arr.some(toBig)

}

// const  filterData = async (data) => {

//    let promise = new Promise((resolve, reject) => {
//     const wordArr = []
//     for(let key in data){
//       const idTich  = data[key]['id']
  
//      for(let go in data[key]['word']) {
//         wordArr.push({
//           id: idTich,
//           title: go,
//           idFlat: `${idTich}_${go}`,
//         })
//      }
  
//     }
//     resolve(wordArr)

//   })

// const result = await promise
// return result.then((e)=>( e)).cath()

// }




// testFlat


return (

 <ScrollView showsVerticalScrollIndicator={false} style={styles.directWraper}>

   {/* <WordModal visible={wordModal}  animationType="none" close={goWordModal} data={allTicher} curent={curentWord} base={true}>
  
  </WordModal> */}

  {/* <DialogModal data={allTicher} visible={dialogModal} close={goDialogModal} curent={curentDialog} base={true}>
    
  </DialogModal> */}

  <StarModal visible={starModal} close={goStarModal}>

  </StarModal>

<View style={{minHeight: windowHeight - 160, paddingTop: 15,paddingBottom: 15}}>
    <View style={{...styles.sectionsWraper,height: '100%',}}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Слова
        </Text>
        <Text style={styles.sectionSubTitle}>
          и словосочетания
        </Text>
        {/* <TouchableOpacity onPress={()=>{goToModal()}}>
        <Text style={{width: 100,height: 100}}>Modal</Text>
        </TouchableOpacity> */}
       

      { visibleScrollBar ? <View style={{...styles.scrolBar}} >
</View> : <View style={{...styles.scrolBar}} >

          <Animated.View style={
            {...styles.scrolTab,
              width: scrollIndicatorSize,
              marginLeft: scrollIndicatorPosition
             }
          } >

          </Animated.View>

        </View>}
        <View style={styles.wordButtonsWraper}>

        <FlatList

  showsHorizontalScrollIndicator={false}
    ref={(ref) => {  this.topFlat = ref}}

    // onEndReachedThreshold={.7}
    // onEndReached={this.topFlat.scrollToIndex({animated: true, index: 4})}
    //     showsHorizontalScrollIndicator={false}
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollIndicator } } }],
      { useNativeDriver: false },
    )}
    onLayout={(e)=>{
      setVisibleScrollContainer(e.nativeEvent.layout.width /100 * 80)
      setVisibleScrollBar(false)
    
    }}
    onContentSizeChange={(width, height) => {
      setContentSize(width /100 * 80);
      setTopFlatReady(true)
      this.topFlat.scrollToIndex({animated: false, index:scrollToBlock(filterData(allTicher, 'word'),0),viewOffset: windowWidth/100*10})
    }}
        horizontal={true}
        data={filterData(allTicher, 'word')}
        keyExtractor={item => item.idFlat}

        // initialScrollIndex={scrollToBlock(filterData(allTicher, 'word'))}
        renderItem={({item,index})=>{

        

          return (
            
          <TouchableOpacity activeOpacity={0.8} disabled={false} style={{position: 'relative'}}  onPress={()=>{
              item.block ? goStarModal(true):
              navigation.navigate('MyModal', {
                data: allTicher,
                curent: {
                     index: Number(item.id - 1),
                    theme: item.title,
                    time: item.time,
                    type: item.type,
                    repeat: item.repeat
                },
                base: true
              })


              // goWordModal(true)
            //   setCurentWord({
            //   index: Number(item.id - 1),
            //   theme: item.title,
            //   time: item.time,
            //   type: item.type,
            //   repeat: item.repeat
            // })
              // goToModal(item.title)
            }}>

          <View style={{...styles.wordButtonWraper, backgroundColor: item.color , width: windowWidth/100*30, height: windowWidth/100*30, marginRight: windowWidth/100*5 ,alignItems: 'flex-start', marginLeft: index == 0 ? windowWidth/100*10 : 0 }}>

              <Text  style={{...styles.wordButtonTitle, opacity:  item.block ? 0.5:1,fontSize: giveFontSize(item.title)?12 : 15}}>
         
                {item.title}
              
              </Text>

              <View style={styles.wordButtonBotWraper} > 
                  <Image  style={{...styles.wordButtonImage,opacity: item.block ? 0.5 : 1}} source={item.icon}></Image>
                  <View style={{...styles.starContainer,opacity: item.block ? 0 : 1}} >
                  {/* <Text  style={{...styles.wordButtonSubTitle,opacity: item.block ? 0:1}}>{item.id}</Text> */}
                    <Image style={styles.starImage} source={item.star}>  
                    </Image>

                  </View>
                  
              </View>
              
              <View style={{position: 'absolute', width:windowWidth/100*30,height: windowWidth/100*30, backgroundColor: 'rgba(0, 0, 0,0.2)',borderRadius: 12, opacity: item.block ? 1: 0 }}></View>
              <Image style={{...styles.blockImg, opacity: item.block ? 0.7 : 0 }} source={require('../../assets/img/block.png')} ></Image>
          </View>
        
        </TouchableOpacity>
  
        )
        }}
         />



        </View>
      </View>
      <View style={{...styles.section, marginTop: 15, height: '100%',}}>
      <Text style={styles.sectionTitle}>
          Диалоги
        </Text>
        <Text style={styles.sectionSubTitle}>
         на примере коротких историй
        </Text>
        
      { visibleScrollBar2 ? <View style={{...styles.scrolBar}} >
</View> : <View style={{...styles.scrolBar}} >

          <Animated.View style={
            {...styles.scrolTab,
              width: scrollIndicatorSize2,
              marginLeft:  scrollIndicatorPosition2
             }
          } >

          </Animated.View>

        </View>}
        <View style={{...styles.wordButtonsWraper, alignSelf: 'stretch', alignContent: 'stretch',flexDirection: 'row',backgroundColor: '#fff',alignItems: 'stretch',height: deviceHeightConst}}>

<FlatList

ref={(ref) => {  this.botFlat = ref}}
showsHorizontalScrollIndicator={false}
scrollEventThrottle={16}
onScroll={Animated.event(
[{ nativeEvent: { contentOffset: { x: scrollIndicator2 } } }],
{ useNativeDriver: false },
)}
onLayout={(e)=>{
setVisibleScrollContainer2(e.nativeEvent.layout.width /100 * 80)
setVisibleScrollBar2(false)

}}
onContentSizeChange={(width, height) => {
setContentSize2(width /100 * 80);
setBotFlatReady(true)
this.botFlat.scrollToIndex({animated: false, index: scrollToBlock(filterData(allTicher, 'phrase'),0),viewOffset: windowWidth/100*10})
}}
horizontal={true}
data={filterData(allTicher, 'phrase')}
keyExtractor={item => item.idFlat} 
renderItem={({item,index})=>{

  return (
  <TouchableOpacity activeOpacity={0.8}  disabled={false}  onPress={()=>{
    item.block ? goStarModal(true):
    navigation.navigate('DialogModal',
    {
      data: allTicher,
      curent: {
           index: Number(item.id - 1),
          theme: item.title,
          time: item.time,
          type: item.type,
          repeat: item.repeat,
        
      },
      base: true,
      goFlag: changeButtonHistory,
      flag: buttonHistory
    }
    )
    // setDialogModal(true)
    // setCurentDialog({
    //   index: Number(item.id - 1),
    //   theme: item.title,
    //   time: item.time,
    //   type: item.type,
    //   repeat: item.repeat
    // })
    
    }}>
    
  <View style={{...styles.wordButtonWraper, backgroundColor: item.color, width: windowWidth/100*30,  marginRight: windowWidth/100*5 , marginLeft: index == 0 ? windowWidth/100*10 : 0 , height: '100%', }}>

      {/* <Text style={{...styles.wordButtonTitle,opacity:  item.block ? 0.5:1}}>Аэропорт</Text> */}


      <ImageBackground imageStyle={{borderRadius: deviceHeightBottomImg}} style={{width: deviceHeightBottomImg ,height: deviceHeightBottomImg,position: 'relative'}} source={item.img} >
      <View style={{...styles.starContainer,opacity: item.block ? 0 : 1, right: -2, bottom: -2,position: 'absolute'}} >
                  {/* <Text  style={{...styles.wordButtonSubTitle,opacity: item.block ? 0:1}}>{item.id}</Text> */}
                    <Image style={styles.starImage} source={item.star}>  
                    </Image>

                  </View>

      </ImageBackground>

  

      <View style={styles.wordButtonBotWraper} > 
      <Text style={{...styles.wordButtonTitle,opacity:  item.block ? 0.5:1,fontSize: giveFontSize(item.title)?12 : 15}}>{item.title}</Text>
      
      </View>

      <View style={{position: 'absolute', width:windowWidth/100*30,height: deviceHeightConst, backgroundColor: 'rgba(0, 0, 0,0.2)',borderRadius: 12, opacity: item.block ? 1: 0 }}></View>


      <Image style={{...styles.blockImg, opacity: item.block ? 0.7 : 0 }} source={require('../../assets/img/block.png')} ></Image>


  </View>

</TouchableOpacity>

)
}}
/>



</View>
      </View>


    </View>

    </View>

    </ScrollView>
    )}

    else {

      useEffect(() => {

        const scrollToBlock = (data) => {
      
          console.log("индекс", data.findIndex(item => item.repeat == 3))
      
          return data.findIndex(item => item.repeat == 0 && item.block == false)
      
        }
      
        
      
        console.log('скролл-эфект')
      
   
          this.topFlat.scrollToIndex({animated: false, index: 5,viewOffset: windowWidth/100*10})
          this.botFlat.scrollToIndex({animated: false, index: 4,viewOffset: windowWidth/100*10})
       
      
      }, [allUser])


      return (
        <View style={styles.directWraperLoad}>
    
    <ActivityIndicator size="large" color="#e10918"  />  
    
    </View>
      )
    }



}  

BaseScreen.navigationOptions = ( {navigation}) => ({
    headerTitle:  'База знаний' ,   

     headerRight: () => ( <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>

     <Item title="Toggle Drawer" iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    
    </HeaderButtons>)

})


const styles = StyleSheet.create({

directWraper: {
 
  backgroundColor: '#fff',
},

directWraperLoad: {
  flex: 1,
  backgroundColor: '#fff',
  paddingVertical: 20,
  justifyContent: 'center'
},

sectionsWraper: {},
section: {},
sectionTitle: {
  fontSize: 32,
  fontFamily: 'sfUi-heavy',
  marginLeft: '10%',
  lineHeight: 32
},
sectionSubTitle: {
  fontSize: 14,
  fontFamily: 'sf-regular',
  color: '#a0a0a0',
  marginLeft: '10%',
  marginBottom: 10
},
wordButtonsWraper: {
  flexDirection: 'row',
  width: '100%'
},
wordButtonWraper: { 
 
  backgroundColor: '#eb5e0b',
  marginRight: 20,
  borderRadius: 12,
  padding: 15,
  justifyContent: 'space-between',
  alignItems: 'center',

},
wordButtonTitle: {

  color: '#fff',
  fontFamily: 'sfUi-heavy',
  flex: 1,
  flexWrap: 'wrap',
  flexDirection: 'row',


},
wordButtonImage: {
  width: 40,
  height: 40,
  tintColor: '#fff',
  opacity: 0.5
},
wordButtonSubTitle: {
  color: '#fff',
  fontFamily: 'gilory-black',
  fontSize: 35,
  marginRight: 0,
  
},

wordButtonBotWraper: {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  position: 'relative',
  
}
,
scrolBar: {
  width: '80%',
  height: 2,
  backgroundColor: '#a0a0a0',
  marginLeft: '10%',
  marginBottom: 15
},
scrolTab: {
 flex: 1,
 height: 2,
  backgroundColor: '#0b1c8c',
 
},
blockImg: {
  position: 'absolute',
  width: 40,
  height: 40,
  bottom: 15,
  right: 17,
  tintColor: '#22b312',
},
starContainer : {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center'
},
starImage: {

    width: 27,
    height: 27,

}



//     directWraper: {

//         width: '100%',
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         backgroundColor: "#fff"
   
        
//     }
//     ,
//     wraper: {
//         maxWidth: '100%',
//        marginTop: 0,
//        overflow: "hidden",
       
//     },
//     tichButton: {

//       width: '100%',
//     textAlign: "center",
//     fontSize: 18,
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     color: '#fff',
//     backgroundColor: "#3A9FE7",
//     minWidth: 140,
//     borderRadius: 20,overflow: 'hidden',
//     borderWidth: 2,borderRadius: 25,borderColor: '#3A9FE7'
 
//     },
//     wraperTue : {
//         marginTop: 30,
//       //  overflow: "hidden",
//        flexDirection: "row",
//        justifyContent: 'flex-start',
//        alignItems: 'flex-start',
//        width: '90%',
//        shadowColor: "#DCCAFF",
//         shadowOffset: {
//           width: 0,
//           height: 6,
//       },
//       shadowOpacity: 0.9,
//       shadowRadius: 8,
//       elevation: 6,
//        borderRadius: 20,
//        backgroundColor: '#fff',
//        paddingVertical: 30,
//        paddingHorizontal: 10,
//        borderWidth: 0
//     },
//     goButton: {
//         color: "#fff",
//         backgroundColor: '#3A9FE7',
//         paddingVertical: 15,
//         paddingHorizontal: 40,
//         minWidth: '65%',
//         fontSize: 20,
//         marginTop: 45,
//         textAlign: 'center',
//         borderRadius: 25,
//         overflow: 'hidden'
//     },
//     actionDirectWraper: {
//       flex: 1,
//       alignItems: 'stretch',
//       // width: "100%",
//       // height: '100%',
//       // marginHorizontal: '5%',
//       // backgroundColor: '#f3f',
//       flexDirection: 'column',
//       justifyContent: "space-between"
    
// },
//   actionContentWraper: {
//       alignItems: 'center',
//       width: "100%",
    
//       marginTop: 0,
//       // backgroundColor: '#FFAFB6'
  
    
//   },
//   actionBigWord: {
//       fontSize: 32,
//       fontFamily: 'open-bold',
//       marginTop: 10,
//       color: '#3B9FE8'

//   },
//   // actionFirstButtonGradient: {   marginTop: 20, width: '100%' },

//   actionFirstButton: {
//       width: '100%',
//       fontSize: 20,
//       color: '#ffffff',
//       backgroundColor: '#3B9FE8',
//       paddingTop: 10,
//       paddingBottom: 10,
//       textAlign: 'center',
//       alignItems: "center",
//       alignContent: "center",
//       justifyContent: 'center',
//       marginBottom: 20,
//       borderRadius: 25,
//       overflow: 'hidden'
//   },
//   flipCard: {
//       width: "90%",
//       marginHorizontal: '5%',
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: "space-between",
//       backfaceVisibility: 'hidden',
//       borderRadius: 40,
//       marginBottom: '5%',
//       shadowColor: "#DCCAFF",
//       shadowOffset: {
//       width: 0,
//       height: 6,
//       },
//       shadowOpacity: 0.37,
//       shadowRadius: 3.5,
//       elevation: 6,
//       height: '96%',

//       // backgroundColor: '#f3f'

//     },
//     actionButtonBlock: {
//       width: '100%',
    
//       marginBottom: 20,
//       alignContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: '5%'
//     },

//     flipCardBack: {

//       position: "absolute",
//       top: 0,
  
//     },
//     flipText: {
//       width: 90,
//       fontSize: 20,
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     actionTranscription: {
//       fontSize: 28,
//       fontFamily: 'open-regular',
//       marginTop: 0,
//       color: THEME.AKCENT_COLOR
//     },
//     activeImage: {
      
//     height: 270,
//     borderRadius: 10,
//     marginTop: 10

//     },
//     activeButonContainer: {
//       flexDirection: "row",
//       width: "100%",
      
//       justifyContent: "space-between",
//       marginTop: 20,
  
//     },
//     activeButonItem: {
    
//       fontSize: 18,
//       color: '#ffffff',
//     },
//     activeButonItemTouch: {
//       width: '45%',
//       height: 55,
//       backgroundColor: "#3A9FE7",
    
//       flexDirection: 'row',
//       alignItems: "center",
//       justifyContent: 'center',
//       borderRadius: 30
//     },
//     containerLoad: {
//       width: "90%",
//       marginHorizontal: '5%',
//       height: 10,
//       flex: 1,
//       marginTop: 10,
//       flexDirection: "row",
//       backgroundColor: '#F1F1F1',
//       borderRadius: 5,
//       marginBottom: 10,
//       backgroundColor: '#f3f'
//     },
//     lineLoad: {
      
//       backgroundColor: '#3A9FE7',
//       height: 10,
//       borderRadius: 5

//     },
//     flatLists: {
//       backgroundColor: '#fff',
//       height: '100%'
//     },
//     loadingContainer: {
//       height: '100%',
//       flex: 1,
//       justifyContent: "center",
//       alignItems: 'center',
//       backgroundColor: '#fff',
//       opacity: 1
//   },
  
//   phraWraper: {
//     flex: 1,
  
//     justifyContent: 'space-between',

//   },
//   mesContainerLeft : {
//     backgroundColor: '#fff',
//     width: '95%',
//     marginTop: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     minHeight: 80,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 0,
//     shadowColor: "#DCCAFF",
//     shadowOffset: {
//     width: 0,
//     height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 2,
//     elevation: 3,
//     position: 'relative'
 
//   },
//   textColorLeft: {
//     color: "#3A9FE7",
//     fontSize: 18
//   },
//   mesContainerRight : {
//     backgroundColor: '#fff',
//     width: '95%',
//     marginTop: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     minHeight: 80,
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     borderBottomRightRadius: 0,
//     borderBottomLeftRadius: 20,
//     alignSelf: "flex-end",
//     shadowColor: "#DCCAFF",
//     shadowOffset: {
//     width: 0,
//     height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 2,
//     elevation: 3,
//   },  
//   textColorRight: {
//     color: "#E78399",
//     fontSize: 18
//   },
  
//   phraButtonWraper: {
//     maxWidth: '90%',
//     width: '90%',
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   phraButtonCenter: {
//     flexDirection: 'row',
//     width: '50%',
//     justifyContent: 'space-between',
//     alignContent: 'center'
// },
// icon2 : {
//   backgroundColor: '#3A9FE7',
//   width: 45,
//   height: 45,
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: 45,

// },
// icon : {
//   backgroundColor: '#3A9FE7',
//   width: 65,
//   height: 65,
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderRadius: 65

// },

})