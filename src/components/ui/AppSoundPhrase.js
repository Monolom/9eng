import React , {useState,useEffect} from 'react'
import {Platform,View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'
import {THEME} from "../../theme"





export const AppSoundPhrase  = ({sound}) => {

    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})
    let soundBox = ''
    useEffect(  () => {
      
   
      


      if(typeof soundbox !== 'undefined'){

        soundbox.unloadAsync()

      }
    
      
      setPlayStatus({playingStatus: 'start'})

   }, [sound])


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

return    <View >
<TouchableOpacity   onPress={() => {_playAndPause(sound)}} style={{width: sDisp() ? 35:45,height: sDisp() ? 35: 45}} >
  <View style={{...styles.icon,width: sDisp() ? 35:45,height: sDisp() ? 35: 45}}>
<Ionicons name={"md-volume-high"} size={sDisp() ? 25:35} color="#fff" />
</View>
  </TouchableOpacity>
</View>

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

    activeContainerVol: {
        flexDirection: "row",
        backgroundColor: '#3A9FE7',
        alignItems: 'center',
        borderRadius: 5,
      height: 55,
      justifyContent: 'center'
     
    
      },
      activeVolText: {
        fontSize: 20,
        color: '#fff',
        marginRight: 15,

      },
      butTouch: {
        width: '45%',
        borderRadius: 30,
        overflow: 'hidden',
      
      },
      icon : {
        backgroundColor: '#3A9FE7',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        paddingTop: Platform.OS === 'ios' ? 2 : 0

      },



})