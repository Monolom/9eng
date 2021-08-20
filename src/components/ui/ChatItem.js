import React, {useState,useRef,useEffect} from 'react'
import {View,StyleSheet,TouchableOpacity,Text,Image,Dimensions,Animated} from 'react-native'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'



export const ChatItem  = ({sound,en,ru,first,index,firstSound,soundPlay,state,dButton,buttonState,closeSound}) => {
    // состояние прозрачности сообщения
    const opasityItemChat = useRef(new Animated.Value(0)).current;
    // состояние отступа сообщения
    const topItemChat = useRef(new Animated.Value(10)).current;
    //состояние звука приложения
    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})

    let soundBox = ''
  // при закрытии модального окна, выгружаем аудио
    useEffect(  () => {
      
      
  if(closeSound){

    soundbox.unloadAsync()
    setPlayStatus({ playingStatus: "stop" })
    
  }
      

   }, [closeSound])
    
// если первый то запускаем,если нет то выгружаем

    useEffect(  () => {
      
      
      if(typeof soundbox !== 'undefined'){

        soundbox.unloadAsync()

      }
    
      if(firstSound){
       
      }else{
        setPlayStatus({playingStatus: 'start'})
      }
      

   }, [sound])




   const SaveSound = sound
 

   // запуск сообщение при первом сообщении
   useEffect(  () => {
   
  
    if(soundPlay){
      setPlayStatus({playingStatus: 'start'})
    }
    

 }, [soundPlay])

   


    useEffect(  () => {

        if(playStatus.playingStatus === 'start'){
            _playAndPause(SaveSound)
        }

   }, [playStatus])





   // записываем разрешение экрана текущего устройства
   const windowWidth = Dimensions.get('window').width;
   const windowHeight = Dimensions.get('window').height;



// Анимация сообщения
useEffect(() => {

    Animated.timing(opasityItemChat, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false
      }).start()

      Animated.timing(topItemChat, {
        toValue: 10,
        duration: 0,
        useNativeDriver: false
      }).start()

}, [index])

useEffect(() => {

    Animated.timing(opasityItemChat, {
        toValue: 1,
        duration: 700,
        useNativeDriver: false
      }).start()

      Animated.timing(topItemChat, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()

}, [])



// Получение нидекса сообщения для 3 сложности
const getNumberPhrase = (index) => {
  if(index >= 9){
    return index
  }
  else {
    return "0"+ (index+1)
  }
}


//слушаем звучание

   _updateScreenForSoundStatus = (status) => {
        
    if  (status.isPlaying && playStatus.playingStatus !== "playing") {

      setPlayStatus({ playingStatus: "playing" });

    } else if (!status.isPlaying && playStatus.playingStatus === "playing") {

      setPlayStatus({ playingStatus: "donepause" });

    }
    else if (status.didJustFinish === true) {

        // при завершении звучания разблокируем кнопки
        soundbox.unloadAsync()
        dButton(false)
        setPlayStatus({ playingStatus: "stop" });

      }
  };

    async function _playRecording(url) {
  
        var arr = url.toString().split("/")     
   
        var filename = arr[arr.length-1]
  
// проверяем если звук есть в системе то запускаем если нет то загружаем
    await  FileSystem.getInfoAsync(FileSystem.documentDirectory+filename)
  .then(success =>{
    if(success.exists){
  
      playTrack()
    
  }else{

      goDounload()
  }
  })
  .catch(error =>{console.error(error);})


 
      //функция загрузка звука
      async function goDounload(){

        await FileSystem.downloadAsync(url, FileSystem.documentDirectory+ filename)
                  .then(({uri})=>{
    
                    playTrack()
                  })
                  .catch(error=>{
                    console.error(error);
                  });
      }


      //функция запуска звука
      async function playTrack () {


                  const { sound } = await  Audio.Sound.createAsync(
                    {uri:FileSystem.documentDirectory+filename},
                  {
                    shouldPlay: true,
                    isLooping: false,
                  },
                  onPlaybackStatusUpdate =_updateScreenForSoundStatus,
                );

                soundbox =  sound;
               
                setPlayStatus({
                  playingStatus: 'playing'
                });

                }

      }

     




      _playAndPause = (url) => {
      


        switch (playStatus.playingStatus) {

          case 'nosound':

          case 'start':

            _playRecording(url);

            break;

            case 'stop':

              _playRecording(url);

          case 'donepause':

          case 'playing':

            _playRecording(url);

            break;

        }


      }


if(state===1){

  return  <Animated.View style={{...styles.chatWraperItem, flexDirection: first ? 'row': 'row-reverse',opacity: opasityItemChat,top: topItemChat, paddingTop: index === 0 ?30: 0}} >
  <TouchableOpacity disabled={buttonState}  activeOpacity={0.9} onPress={() => {
    dButton(true)
    _playRecording(SaveSound);
  }}>
    <View  style={{flexDirection: first ? 'row': 'row-reverse',
    justifyContent: 'flex-end',}} >
  <View style={{...styles.chatSoundBlok,width: windowWidth / 100 * 25}}>
  
  <Image style={{width: index === 0 ?35:45,height: index === 0 ?30:40,tintColor: '#fff',}} source={require('../../../assets/img/sound.png')}></Image>
  
  { index === 0 ? <View>
  <Text style={styles.soundText}> нажмите 
   </Text>
   <Text style={styles.soundText}> для аудио</Text>
  </View> : null}
  </View>
  <View style={first ?styles.chatTextBlock:styles.chatTextBlockSecond}>
    <Text style={{...styles.ruText,textAlign: first ? 'right' : 'left'}}>{ru}</Text>
    <Text style={{...styles.enText,textAlign: first ? 'right' : 'left'}}>{en}</Text>
  </View>
  </View>
  </TouchableOpacity>  
  </Animated.View> 
}

else if (state===2){
  return  <Animated.View style={{...styles.chatWraperItem, flexDirection: first ? 'row': 'row-reverse',opacity: opasityItemChat,top: topItemChat,    paddingTop: index === 0 ?30: 0}} >
  <TouchableOpacity disabled={buttonState}  activeOpacity={0.9} onPress={() => { dButton(true)
    _playRecording(SaveSound);}}>
    <View  style={{flexDirection: first ? 'row': 'row-reverse',
    justifyContent: 'flex-end',}} >
  <View style={{...styles.chatSoundBlok,width: windowWidth / 100 * 25}}>
  
  <Image style={{width: index === 0 ?35:45,height: index === 0 ?30:40,tintColor: '#fff',}} source={require('../../../assets/img/sound.png')}></Image>
  
  { index === 0 ? <View>
  <Text style={styles.soundText}> нажмите 
   </Text>
   <Text style={styles.soundText}> для аудио</Text>
  </View> : null}
  </View>
  <View style={first ?styles.chatTextBlock:styles.chatTextBlockSecond}>
    <Text style={{...styles.enText,textAlign: first ? 'right' : 'left'}}>{en}</Text>
  </View>
  </View>
  </TouchableOpacity>  
  </Animated.View> 
}


else if (state===3){
  return  <Animated.View style={{...styles.chatWraperItem, flexDirection: first ? 'row': 'row-reverse',opacity: opasityItemChat,top: topItemChat,  paddingTop: index === 0 ?30: 0 }} >
  <TouchableOpacity  disabled={buttonState} activeOpacity={0.9} onPress={() => { dButton(true)
    _playRecording(SaveSound);}}>
    <View  style={{flexDirection: first ? 'row': 'row-reverse',
    justifyContent: 'flex-end',}} >
  { index === 0 ?<View style={{...styles.chatSoundBlok,width: windowWidth / 100 * 25}}>
  
  
  
   <View>
  <Text style={styles.soundText}> нажмите 
   </Text>
   <Text style={styles.soundText}> для аудио</Text>
  </View> 
  </View>: null}
  <View style={{...styles.chatTextOnlySounFirst, width: windowWidth/100*50,
   borderTopLeftRadius:first? 35 : 0,
   borderBottomLeftRadius: first? 35 : 0,
   borderTopRightRadius: first? 0 : 35,
   borderBottomRightRadius: first? 0 : 35,
   paddingLeft: first?50:0,
   paddingRight: first?0:50,
   backgroundColor: first ? "#C027B7":"#024AC0"
  }}>
  <Image style={{...styles.ImageOnlySound,width: 35,height: 30,tintColor: '#fff',
  left: first? 20: null,
  right: first? null: 20
}} source={require('../../../assets/img/sound.png')}></Image>
    <Text style={{...styles.textOnlySound,textAlign: 'center'}}>{getNumberPhrase(index)}</Text>
  </View>
  </View>
  </TouchableOpacity>  
  </Animated.View> 
}
 










}

const styles = StyleSheet.create({

    chatWraper: {
        flex: 1,
        paddingTop: 30
      },
      chatWraperItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
        alignSelf: 'auto'
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
        justifyContent: 'space-between',
    
      },
      chatTextOnlySounFirst: {
        width: '45%',
        backgroundColor: "#C027B7",
        padding: 10,
        paddingLeft: 50,
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        justifyContent: 'space-between',
        position: 'relative',
        height: 70
      },
      chatTextOnlySoundSecond: {
        width: '45%',
        backgroundColor: "#024AC0",
        padding: 10,
        paddingRight: 50,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'space-between',
        position: 'relative',
        
      },
      ImageOnlySound: {
        position: 'absolute',
        top: 20,
        left: 20
      },
      textOnlySound: {
        fontFamily: 'gilory-heavy',
        fontSize: 40,
        color: "#fff"
      },
      chatSoundBlok: {
        width: '25%',
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
      }

})
