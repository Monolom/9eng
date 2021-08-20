import React , {useState,useEffect} from 'react'
import {Platform,View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'
import {THEME} from "../../theme"





export const WordSound  = ({sound,en,tr,soundPlay,giveFontSize}) => {

    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})
    let soundBox = ''

    useEffect(  () => {
      
 
      if(typeof soundbox !== 'undefined'){

        soundbox.unloadAsync()

      }
    
      
      setPlayStatus({playingStatus: 'nosound'})

   }, [sound])
   
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

   
   const windowWidth = Dimensions.get('window').width;
   const windowHeight = Dimensions.get('window').height;

   const sDisp = () => {
     if(windowHeight < 620){
       return true
     }else{
       return false
     }
     
   }


//    promisedSetState = (newState) => {
//     return new Promise((resolve) => {
//         setPlayStatus(newState, () => {
//             resolve()
//         });
//     });
// }

   _updateScreenForSoundStatus = (status) => {
        
    if  (status.isPlaying && playStatus.playingStatus !== "playing") {
      setPlayStatus({ playingStatus: "playing" });
    } else if (!status.isPlaying && playStatus.playingStatus === "playing") {
      setPlayStatus({ playingStatus: "donepause" });
    }
    else if (status.didJustFinish === true) {
   
        setPlayStatus({ playingStatus: "stop" });
        // if(typeof soundbox !== 'undefined'){
        //   console.log("ебобобо",)
        // }else{
        //   console.log("не ебобобо",)
        // }
      }
  };

    async function _playRecording(url) {
        
        var arr = url.toString().split("/")     
        console.log(`uri for sound: ${url}`)    
        var filename = arr[arr.length-1]
  

    await  FileSystem.getInfoAsync(FileSystem.documentDirectory+filename)
  .then(success =>{
    if(success.exists){
      console.log('фаил есть',success.exists)
      playTrack()
    
  }else{
      console.log('фаил нет',success.exists)
      goDounload()
  }
  })
  .catch(error =>{console.error(error);})



      async function goDounload(){

        await FileSystem.downloadAsync(url, FileSystem.documentDirectory+ filename)
                  .then(({uri})=>{
                    console.log("finished downloading to", uri)
                    playTrack()
                  })
                  .catch(error=>{
                    console.error(error);
                  });
      }



      async function playTrack () {
      //   const { sound } = await  Audio.Sound.createAsync(
      //     require('../../sound/1.mp3'),
      //   {
      //     shouldPlay: true,
      //     isLooping: false,
      //   },
      //   onPlaybackStatusUpdate =_updateScreenForSoundStatus,
      // );

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
                console.log('playing...');
                await soundbox.replayAsync();
                console.log('playing!');
                setPlayStatus({
                  playingStatus: 'playing',
                });
            }
          else if (playStatus.playingStatus == 'playing') {
            console.log('pausing...');
            await soundbox.pauseAsync();
            console.log('paused!');
            setPlayStatus({
              playingStatus: 'donepause',
            });
          } else {
            console.log('playing...');
            await soundbox.playAsync();
            console.log('playing!');
            setPlayStatus({
              playingStatus: 'playing',
            });
          }
        }else if(soundbox == null){
            console.log('saund null')
        }
      }

   const  _syncPauseAndPlayRecording =   () => {

        if (soundbox != null) {
          if (playStatus.playingStatus == 'playing') {
            soundbox.pauseAsync();
          } else {
            soundbox.playAsync();
          }
        }
      }

      _playAndPause = (url) => {
      
    // console.log(url)

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


{/* <View >
<TouchableOpacity   onPress={() => {_playAndPause(sound)}} style={{width: sDisp() ? 35:45,height: sDisp() ? 35: 45}} >
  <View style={{...styles.icon,width: sDisp() ? 35:45,height: sDisp() ? 35: 45}}>
<Ionicons name={"md-volume-high"} size={sDisp() ? 25:35} color="#fff" />
</View>
  </TouchableOpacity>
</View> */}

{/* <TouchableOpacity style={styles.butTouch}  onPress={() => {
        
    _playAndPause(sound)
    
    } }>

<View style={styles.activeContainerVol}>

<Text style={styles.activeVolText}>Слушать</Text>
<Ionicons  size={24} color="#fff" name="md-volume-high" />  

</View>

            </TouchableOpacity> */}



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