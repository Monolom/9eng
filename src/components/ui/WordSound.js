import React , {useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'






export const WordSound  = ({sound,en,tr,soundPlay,giveFontSize}) => {

    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})
    let soundBox = ''



    // если первый то запускаем,если нет то выгружаем
    useEffect(  () => {
      
 
      if(typeof soundbox !== 'undefined'){

        soundbox.unloadAsync()

      }
    
      
      setPlayStatus({playingStatus: 'nosound'})

   }, [sound])


      // запуск аудио при первом сообщении

    useEffect(  () => {
      
 
      if(soundPlay){

        _playAndPause(sound)

      }

   }, [soundPlay])


    useEffect(  () => {

        if(playStatus.playingStatus === 'start'){
            _playAndPause(sound)
        }

   }, [playStatus])



   async function replaceSound(){

   }

   
// записываем размеры текущего экрана
   const windowHeight = Dimensions.get('window').height;

   const sDisp = () => {
     if(windowHeight < 620){
       return true
     }else{
       return false
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



      //функция загрузки звука
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

     

      async function _pauseAndPlayRecording() {
        if (soundbox != null) {
          
            if (playStatus.playingStatus == "stop") {
             
                await soundbox.replayAsync();
            
                setPlayStatus({
                  playingStatus: 'playing',
                });
            }
          else if (playStatus.playingStatus == 'playing') {
      
            await soundbox.pauseAsync();
         
            setPlayStatus({
              playingStatus: 'donepause',
            });
          } else {
        
            await soundbox.playAsync();
          
            setPlayStatus({
              playingStatus: 'playing',
            });
          }
        }else if(soundbox == null){
        
        }
      }



      _playAndPause = (url) => {
      


        switch (playStatus.playingStatus) {
          case 'nosound':
          case 'start':
            _playRecording(url);
            break;
            case 'stop':
            _pauseAndPlayRecording();
          case 'donepause':
          case 'playing':
            _pauseAndPlayRecording();
            break;
        }

      }

return <TouchableOpacity onPress={() => {_playAndPause(sound)}}>
  
  
  <Text style={styles.preSpan}>нажмите чтобы прослушать ещё раз</Text>
  <View style={{...styles.midleButton,minHeight: 80}}>
  
  <View  style={{width: '100%'}} >
  <Text style={{...styles.bigWord,paddingVertical: 0, fontSize: giveFontSize(en,'en')? 20 : 30}}>{en}</Text>
  <Text style={styles.bigWordLight}>{"("+tr+ ")"}</Text>
  </View>
  <View style={{position: 'absolute', right: 20,top: 20}} >
  <Ionicons  size={40} color="#fff" name="md-volume-high" />  
  </View>
  
  </View>
  </TouchableOpacity>  



}

const styles = StyleSheet.create({
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
bigWord: {

  width: '100%',
  paddingHorizontal: '10%',
  color: '#fff',
  fontSize: 30,
  fontFamily: 'sfUi-bold',
  paddingVertical: 5,
  letterSpacing: 1

 },
 midleButton: {
  backgroundColor: '#42a9e0',
  color: "#fff",
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'relative'
 },
 bigWordLight: {
  fontFamily: 'sf-light',
  fontSize: 16,
  color: '#fff',
  paddingHorizontal: '10%',
  marginBottom: 10
}, 


})