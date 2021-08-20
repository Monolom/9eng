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
 

export const RepeatScreen = ({navigation}) => {



// core load data 
const dispatch = useDispatch()
    
useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

useEffect(() => {
    dispatch(loadTicher())
  }, [dispatch])

const pressDispatch = () => {
  dispatch(loadUser())
}
  const allUser = useSelector(state => state.user.allUser)

  const allTicher = useSelector(state => state.ticher.allTicher)

const isEmpityObj = (obj) => {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;
const [contentSize, setContentSize] = useState(1);

const [visibleScrollContainer, setVisibleScrollContainer] = useState(windowWidth);

const scrollIndicator = useRef(new Animated.Value(0)).current;

const [visibleScrollBar, setVisibleScrollBar] = useState(true);  

const [contentSize2, setContentSize2] = useState(1);

const [visibleScrollContainer2, setVisibleScrollContainer2] = useState(windowWidth);

const scrollIndicator2 = useRef(new Animated.Value(0)).current;

const [visibleScrollBar2, setVisibleScrollBar2] = useState(true);  

const [wordModal,setWordModal] = useState(false)

const [dialogModal, setDialogModal] = useState(false)

const [starModal,setStarModal] = useState(false)


const [ curentWord, setCurentWord ] = useState(false)

const [ curentDialog, setCurentDialog ] = useState(false)




  if( !isEmpityObj(allUser)) {

   
// logik app const 
// после какого повторения открываеться слудующий урок
const repeatIterationOpen = 2


const [buttonHistory,setButtonHistory] = useState({
  autoplay: false,
  level: 1
})

const changeButtonHistory = (flag) => {
  setButtonHistory(flag)
}
// scrol bar state / const 1//

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




const deviceHeightConst =  windowHeight - (windowWidth/100*30) - (windowWidth/100*30/100*70) - 280

const deviceHeightBottomImg = windowWidth/100*30/100*70
const deviceHeightBottomImgHeart = windowWidth/100*30/100*85
//Style const //

//Modal State //


const goWordModal = (boolean) => {

  setWordModal(boolean)

}

const goDialogModal = (boolean) => {

  setDialogModal(boolean)

}

const goStarModal = (boolean) => {

  setStarModal(boolean)
}


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

            for(var key2 in myObj[key]){
              
              if(myObj[key]['repeat'] < 3){
                return false
              }
            
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
          return require('../../assets/img/star_5.png')
        }else {
          return require('../../assets/img/star_5.png')
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
       
            const checkDataRef = allUser.repeat[id-1]
       
          if(id === '1'){

            return false

          }
        else if (getRepeatStatus(checkDataRef['word']) && getRepeatStatus(checkDataRef['phrase'])){

          return false

        }
        else {
          return true
        }
        return true
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
            color: styleData(idTich).color,
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

      const filterTichProgress = (id,type,repeat) => {
        let result = false
      
       const obj = allUser.repeat[id][type]
       const obj2 = allUser.repeat[id][type==='word'? 'phrase': 'word']
        for(key in obj){
          if(obj[key]['repeat'] < repeat){
            result = true
          }
        }
        for(key in obj2){
          if(obj2[key]['repeat'] < repeat){
            result = true
          }
        }

        if(repeat === 1){
          result = false
        }
        return result
      }

      const filterTimeProgress = (repeat,time) => {
        let checkDate = new Date()
        let curentDate = checkDate.getTime()
        if(repeat === 1){
          return false
        }else if(repeat === 2){
          if (curentDate  -  time >= 0 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }
        else if(repeat === 3){
          if (curentDate  -  time >= 0 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }
        else if(repeat === 4){
          if (curentDate  -  time >= 0 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }
        else if(repeat === 5){
          if (curentDate  -  time >= 0 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time - 1440000)
            return true
          }
        }
        else if(repeat === 6){
          if (curentDate  -  time >= 180000 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }else if(repeat === 7){
          if (curentDate  -  time >= 180000 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }else if(repeat === 8){
          if (curentDate  -  time >= 180000 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }else if(repeat === 9){
          if (curentDate  -  time >= 180000 ){
          return false
          }else{
            console.log("осталось",curentDate  -  time)
            return true
          }
        }
      }
      const filterFunction=(value)=>{
        if(value.block === true){
          return false
        }else if (value.repeat < 1){
          return false
        }else if (value.repeat > 8){
          return false
        }
        // else if (filterTichProgress(value.id,value.type,value.repeat)){
        //   return false
        // }
        else if (filterTimeProgress(value.repeat,value.time)){
          return false
        }
        // else  if(filterTimeProgress)
        else{  return true}
      }
      const baseArr = Arr.filter(filterFunction)
      // console.log('чё за массив',baseArr)
      return baseArr    
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
   {/* <WordModal visible={wordModal}  animationType="none" close={goWordModal} data={allTicher} curent={curentWord}>
  
  </WordModal> */}

  {/* <DialogModal data={allTicher} visible={dialogModal} close={goDialogModal} curent={curentDialog}>
    
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
          
        {filterData(allTicher, 'word').length > 0 ?  <FlatList
        showsHorizontalScrollIndicator={false}
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
    }}
        horizontal={true}
        data={filterData(allTicher, 'word')}
        keyExtractor={item => item.idFlat}
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
                base: false
              })

            }}>

          <View style={{...styles.wordButtonWraper, width: windowWidth/100*30, height: windowWidth/100*30, marginRight: windowWidth/100*5 ,alignItems: 'flex-start', marginLeft: index == 0 ? windowWidth/100*10 : 0 }}>

              <Text style={{...styles.wordButtonTitle, opacity:  item.block ? 0.5:1,fontSize: giveFontSize(item.title)?12 : 15}}>{item.title}</Text>

              <View style={styles.wordButtonBotWraper} > 

                  <Image  style={{...styles.wordButtonImage}} source={require('../../assets/img/repat2.png')}></Image>
            <View style={styles.goSpanWraper}>
            <Text style={styles.goSpans}>
                  начать 
                </Text>
                <Text style={styles.goSpans}>
                  повторение
                </Text>
            </View>
            
               
                  
              </View>
              
              <View style={{position: 'absolute', width:windowWidth/100*30,height: windowWidth/100*30, backgroundColor: 'rgba(0, 0, 0,0.2)',borderRadius: 12, opacity: item.block ? 1: 0 }}></View>
              <Image style={{...styles.blockImg, opacity: item.block ? 0.7 : 0 }} source={require('../../assets/img/block.png')} ></Image>
          </View>
        
        </TouchableOpacity>
  
        )
        }}
         /> :  <TouchableOpacity disabled={false} style={{position: 'relative'}}  onPress={()=>{
          pressDispatch()
        }}>

      <View style={{...styles.wordButtonWraperHeart, width: windowWidth/100*30, height: windowWidth/100*30, marginRight: windowWidth/100*5 , marginLeft: windowWidth/100*10  }}>

          <Image style={{width: windowWidth/100*12, height: windowWidth/100*12}} source={require('../../assets/img/heart1.png')}>

          </Image>

          <View style={styles.wordButtonBotWraper} > 

              
        <View style={styles.goSpanWraper}>
        <Text style={styles.goSpansHeart}>
             нет материала
            </Text>
            <Text style={styles.goSpansHeart}>
              для повторения
            </Text>
        </View>
        
           
              
          </View>
          
  
     
      </View>
    
    </TouchableOpacity>}



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

{filterData(allTicher, 'phrase').length > 0 ? <FlatList


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
          repeat: item.repeat
      },
      base: false,
      goFlag:  changeButtonHistory,
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
    
  <View style={{...styles.wordButtonWraper,  width: windowWidth/100*30,  marginRight: windowWidth/100*5 , marginLeft: index == 0 ? windowWidth/100*10 : 0 , height: '100%', }}>

      {/* <Text style={{...styles.wordButtonTitle,opacity:  item.block ? 0.5:1}}>Аэропорт</Text> */}


      <View  style={{width: deviceHeightBottomImg ,height: deviceHeightBottomImg,position: 'relative',backgroundColor: '#fff',borderRadius: deviceHeightBottomImg /2,justifyContent: 'center',alignItems: 'center' }}  >
          <Image style={styles.goImg} source={require('../../assets/img/repat1.png')}>

          </Image>
            <Text style={styles.goSpansBottom} >
                повторить 
            </Text>
            <Text style={styles.goSpansBottom} >
               истории
            </Text>
      </View>

  

      <View style={styles.wordButtonBotWraper} > 
      <Text style={{...styles.wordButtonTitle,opacity:  item.block ? 0.5:1,fontSize: giveFontSize(item.title)?12 : 15}}>{item.title}</Text>
      
      </View>

      <View style={{position: 'absolute', width:windowWidth/100*30,height: deviceHeightConst, backgroundColor: 'rgba(0, 0, 0,0.2)',borderRadius: 12, opacity: item.block ? 1: 0 }}></View>


      <Image style={{...styles.blockImg, opacity: item.block ? 0.7 : 0 }} source={require('../../assets/img/block.png')} ></Image>


  </View>

</TouchableOpacity>

)
}}
/> :  <TouchableOpacity  disabled={false}  onPress={()=>{

pressDispatch()
    
    }}>
    
  <View style={{...styles.wordButtonWraperHeart,  width: windowWidth/100*30,  marginRight: windowWidth/100*5 , marginLeft: windowWidth/100*10 , height: '100%', }}>

  


      <Image style={{width: deviceHeightBottomImgHeart ,height: deviceHeightBottomImgHeart,position: 'relative',backgroundColor: '#fff',borderRadius: deviceHeightBottomImgHeart /2,}} source={require('../../assets/img/heart2.png')}  >
       
      </Image>

  

      <View style={{...styles.wordButtonBotWraper,flexDirection: 'column'}} > 
      <Text style={styles.goSpansHeart}>
             нет историй 
            </Text>
            <Text style={styles.goSpansHeart}>
              для повторения
            </Text>
      
      </View>

   





  </View>

</TouchableOpacity>}



</View>
      </View>


    </View>

    </View>

    </ScrollView>
    )}

    else {

      const [buttonHistory,setButtonHistory] = useState({
        autoplay: false,
        level: 1
      })


      
      return (
        <View style={styles.directWraperLoad}>
    
    <ActivityIndicator size="large" color="#e10918"  />  
    
    </View>
      )
    }



}  

RepeatScreen.navigationOptions = ( {navigation}) => ({
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
 
  backgroundColor: '#58c40a',
  marginRight: 20,
  borderRadius: 12,
  padding: 15,
  justifyContent: 'space-between',
  alignItems: 'center',


},
wordButtonWraperHeart: { 
  borderWidth: 4,
  borderColor: '#BFEECA',
  backgroundColor: '#fff',
  marginRight: 20,
  borderRadius: 12,
  padding: 10,
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent: 'center',
  opacity: 1


},
wordButtonTitle: {
  color: '#fff',
  fontFamily: 'sfUi-heavy',
},
wordButtonImage: {
  width: 28,
  height: 40,
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
  alignItems: 'center',
  position: 'relative',
  alignContent: 'center'
},

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
,
goSpans: {
color: '#fff',
fontSize: 11,
fontFamily: 'sf-semiB',
lineHeight: 10,
letterSpacing: 0.5
},
goSpansHeart: {
  color: '#a0a0a0',
  fontSize: 11,
  fontFamily: 'sf-semiB',
  lineHeight: 10,
  letterSpacing: 0.5,
  textAlign: 'center',
  opacity: 0.5
  },
goSpanWraper : {
  justifyContent: 'center',
 alignContent: 'center',
 marginLeft: 4

},
goImg: {
  width: 30,
  height: 40
},
goSpansBottom: {
  fontSize: 11,
  fontFamily: 'sf-semiB',
  color: '#58c40a',
  lineHeight: 10
},
heartImgTop: {
  width: '30%',
  height: '30%'
}



})