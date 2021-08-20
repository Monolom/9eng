// React, react-navigation
import React, {useState , useEffect, useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList,Animated,Dimensions,ActivityIndicator,Image,ScrollView,ImageBackground} from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {loadTicher} from '../store/actions/ticher'
import {loadUser} from '../store/actions/user'
// Модальное окно с объяснениями
import {StarModal} from '../components/ui/StarModal'


 
// экран "база знаний"
export const BaseScreen = ({navigation}) => {


const dispatch = useDispatch()
// при изменении загружаем новые данные
useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

useEffect(() => {
    dispatch(loadTicher())
  }, [dispatch])




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
 
  if( !isEmpityObj(allUser) ) {


// функция скрола до ближайшего неиспользванного элемента
const scrollToBlock = (data,index) => {
  let curentIndex = data.findIndex(item => item.repeat == index && item.block == false)

  if(curentIndex >= 0){
  
    return curentIndex 
  }else{
    return scrollToBlock(data,index + 1)
  }
      
}

//константа после которого повторения будет открываться следующий урок
const repeatIterationOpen = 1

// состояние настроек повторения диалогов
const [buttonHistory,setButtonHistory] = useState({
  autoplay: false,
  level: 1
})
//функция смены сосотояни настроек диалогов
const changeButtonHistory = (flag) => {
  setButtonHistory(flag)
}



// Настройки скроллбара для слов(верхний)
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

// Настройки скроллбара для фраз(нижний)
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

// получаем размеры экрана устройства
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// когда списки готовим скролим до нужного блока

useEffect(() => {


if(botFlatReady){

  this.botFlat.scrollToIndex({animated: false, index: 4,viewOffset: windowWidth/100*10})

}else {

}

if(topFlatReady){

  this.topFlat.scrollToIndex({animated: false, index: 5,viewOffset: windowWidth/100*10})

}

else{

}


}, [topFlatReady,botFlatReady ])



//вычесляем переменные для вёрстки
const deviceHeightConst =  windowHeight - (windowWidth/100*30) - (windowWidth/100*30/100*70) - 280

const deviceHeightBottomImg = windowWidth/100*30/100*70

//Style const //

//Modal State //

// состояние модального окна с подсказками
const [starModal,setStarModal] = useState(false)


//Функция изменения состояния модального окна
const goStarModal = (boolean) => {

  setStarModal(boolean)

}


//состояния загрузки списко (flatlist)
const [topFlatReady,setTopFlatReady] = useState(false)

const [botFlatReady,setBotFlatReady] = useState(false)








//формируем массив для списко слов/диалогов
    const  filterData = (data, type) => {
      //получаем количество повторения прошлого урока
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
          return require('../../assets/img/star_6.png')
        }else {

          return require('../../assets/img/star_6.png')
        }
      }

      // получаем время последнего повторения
       const getTimeItem = (id,type,title) =>{
          return allUser.repeat[id][type][title]['time']
       }

      // определяем заблокирован урок или нет
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
      //объект с цветами карточек списков
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
      //объект с картинками диалогов
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

      //объект с картинками Слов
      const getIconObj = {

        'Аэропорт': require('../../assets/icon/01a.png'),
        'Стойка регистрации': require('../../assets/icon/02a.png'),
        'Таможенный контроль': require('../../assets/icon/04a.png'),
        'Объявления в Аэропорту': require('../../assets/icon/05a.png'),
        'В самолёте': require('../../assets/icon/07a.png'),
        'Ситуации в аэропорту': require('../../assets/icon/09a.png'),
        'Регистрация в отеле': require('../../assets/icon/16a.png'),
        'Улица': require('../../assets/icon/20a.png'),
        'Знакомства': require('../../assets/icon/21a.png'),
        'Магазин': require('../../assets/icon/23a.png'),
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
    

      const Arr = []
      //формируем массив данных
      for(let key in data){

      const idTich  = data[key]['id']
  
       for(let go in data[key]["data"][type === 'word'? 'word': "phrase"]) {
       
          Arr.push({  

            id: idTich,
            title: go,
            idFlat: `${idTich}_${go}`,
            color: getBgCardObj[idTich][type],
            icon: getIconObj[go] ? getIconObj[go] : require('../../assets/icon/01a.png'),
            img : getCardImgObj[go],
            block: blockData(idTich),
            time: getTimeItem(idTich,type,go),
            type: type,
            repeat: allUser.repeat[idTich][type][go]['repeat'],
            star: getStarImg(idTich,type,go)
            
          })

       }
    
      }

      return Arr    
   }


//функция получения размера шрифта
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

        <FlatList

  showsHorizontalScrollIndicator={false}
    ref={(ref) => {  this.topFlat = ref}}


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


  
            }}>

          <View style={{...styles.wordButtonWraper, backgroundColor: item.color , width: windowWidth/100*30, height: windowWidth/100*30, marginRight: windowWidth/100*5 ,alignItems: 'flex-start', marginLeft: index == 0 ? windowWidth/100*10 : 0 }}>

              <Text  style={{...styles.wordButtonTitle, opacity:  item.block ? 0.5:1,fontSize: giveFontSize(item.title)?12 : 15}}>
         
                {item.title}
              
              </Text>

              <View style={styles.wordButtonBotWraper} > 
                  <Image  style={{...styles.wordButtonImage,opacity: item.block ? 0.5 : 1}} source={item.icon}></Image>
                  <View style={{...styles.starContainer,opacity: item.block ? 0 : 1}} >
             
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

    
    }}>
    
  <View style={{...styles.wordButtonWraper, backgroundColor: item.color, width: windowWidth/100*30,  marginRight: windowWidth/100*5 , marginLeft: index == 0 ? windowWidth/100*10 : 0 , height: '100%', }}>




      <ImageBackground imageStyle={{borderRadius: deviceHeightBottomImg}} style={{width: deviceHeightBottomImg ,height: deviceHeightBottomImg,position: 'relative'}} source={item.img} >
      <View style={{...styles.starContainer,opacity: item.block ? 0 : 1, right: -2, bottom: -2,position: 'absolute'}} >
            
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
      
       
      
          return data.findIndex(item => item.repeat == 0 && item.block == false)
      
        }
      
        
      
    
      
   
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

})