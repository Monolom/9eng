// React, react-navigation
import React, {useState , useEffect, useRef} from 'react'
import {View,Text,StyleSheet, TouchableOpacity, FlatList,Animated,Dimensions,ActivityIndicator,Image,ScrollView} from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {loadTicher} from '../store/actions/ticher'
import {loadUser} from '../store/actions/user'
// Модальное окно с объяснениями
import {StarModal} from '../components/ui/StarModal'
 
// экран "повторения"
export const RepeatScreen = ({navigation}) => {



// core load data 
const dispatch = useDispatch()
   // при изменении загружаем новые данные 
useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

useEffect(() => {
    dispatch(loadTicher())
  }, [dispatch])

const pressDispatch = () => {
  dispatch(loadUser())
}


  // получаем данные
  const allUser = useSelector(state => state.user.allUser)

  const allTicher = useSelector(state => state.ticher.allTicher)


//Функция проверки на объект
const isEmpityObj = (obj) => {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}
// получаем размеры экрана устройства
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Настройки скроллбара для слов(верхний)
const [contentSize, setContentSize] = useState(1);

const [visibleScrollContainer, setVisibleScrollContainer] = useState(windowWidth);

const scrollIndicator = useRef(new Animated.Value(0)).current;

const [visibleScrollBar, setVisibleScrollBar] = useState(true);  
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


// Настройки скроллбара для фраз(нижний)
const [contentSize2, setContentSize2] = useState(1);

const [visibleScrollContainer2, setVisibleScrollContainer2] = useState(windowWidth);

const scrollIndicator2 = useRef(new Animated.Value(0)).current;

const [visibleScrollBar2, setVisibleScrollBar2] = useState(true);  


const [starModal,setStarModal] = useState(false)

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




  if( !isEmpityObj(allUser)) {

   
// состояние настроек повторения диалогов
const [buttonHistory,setButtonHistory] = useState({
  autoplay: false,
  level: 1
})
//функция смены сосотояни настроек диалогов
const changeButtonHistory = (flag) => {

  setButtonHistory(flag)

}



//Style const //




//вычесляем переменные для вёрстки
const deviceHeightConst =  windowHeight - (windowWidth/100*30) - (windowWidth/100*30/100*70) - 280

const deviceHeightBottomImg = windowWidth/100*30/100*70
const deviceHeightBottomImgHeart = windowWidth/100*30/100*85
//Style const //

//Modal State //



//Функция изменения состояния модального окна
const goStarModal = (boolean) => {

  setStarModal(boolean)
}




//формируем массив для списко слов/диалогов
    const  filterData = (data, type) => {
            //получаем количество повторения прошлого урока
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
      //получаем картинку в зависимости от количества повторений
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
      // получаем время последнего повторения
       const getTimeItem = (id,type,title) =>{
    
          return allUser.repeat[id][type][title]['time']
       }
      // определяем заблокирован урок или нет
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

      
    

      const Arr = []
      //формируем массив
      for(let key in data){
        const idTich  = data[key]['id']
  
       for(let go in data[key]["data"][type === 'word'? 'word': "phrase"]) {
       
          Arr.push({  

            id: idTich,
            title: go,
            idFlat: `${idTich}_${go}`,
            block: blockData(idTich),
            time: getTimeItem(idTich,type,go),
            type: type,
            repeat: allUser.repeat[idTich][type][go]['repeat'],
            star: getStarImg(idTich,type,go)
            
          })
       }
    
      }

  
      // проверка на то прошлоли достаточно времени
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
      //фильтруем что показывать что нет
      const filterFunction=(value)=>{
        if(value.block === true){
          return false
        }else if (value.repeat < 1){
          return false
        }else if (value.repeat > 8){
          return false
        }
     
        else if (filterTimeProgress(value.repeat,value.time)){
          return false
        }

        else{  return true}
      }
      const baseArr = Arr.filter(filterFunction)
      return baseArr    
   }


//получаем размер шрифта
   const giveFontSize = (string) => {
 
    const maxWidthWord = 8
    const toBig = (string) => {
      return string.length > maxWidthWord
    }
    const arr = string.split(' ')
  
    return arr.some(toBig)
  
  }



return (

 <ScrollView showsVerticalScrollIndicator={false} style={styles.directWraper}>



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

    
    }}>
    
  <View style={{...styles.wordButtonWraper,  width: windowWidth/100*30,  marginRight: windowWidth/100*5 , marginLeft: index == 0 ? windowWidth/100*10 : 0 , height: '100%', }}>




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