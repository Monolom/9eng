import React , {useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'
import {THEME} from "../../theme"




export const AppSound  = ({sound}) => {

    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})
    let soundBox = ''
    useEffect(  () => {
      if(typeof soundbox !== 'undefined'){

        soundbox.unloadAsync()

      }
      setPlayStatus({
        playingStatus: 'nosound'
      });
    
   }, [sound])

   const windowWidth = Dimensions.get('window').width;
   const windowHeight = Dimensions.get('window').height;

   const sDisp = () => {
     if(windowHeight < 620){
       return true
     }else{
       return false
     }
     
   }





   _updateScreenForSoundStatus = (status) => {
        
    if  (status.isPlaying && playStatus.playingStatus !== "playing") {
      setPlayStatus({ playingStatus: "playing" });
    } else if (!status.isPlaying && playStatus.playingStatus === "playing") {
      setPlayStatus({ playingStatus: "donepause" });
    }
    else if (status.didJustFinish === true) {
   
        setPlayStatus({ playingStatus: "stop" });
      }
  };

    async function _playRecording(url) {
        
        var arr = url.toString().split("/")     
        console.log(`uri for sound: ${url}`)    
        var filename = arr[arr.length-1]
  

        FileSystem.getInfoAsync(FileSystem.documentDirectory+filename)
  .then(success =>{
    if(success.exists){
      console.log('фаил есть',success.exists)
      playTrack ()
    
  }else{
      console.log('фаил нет',success.exists)
      goDounload()
  }
  })
  .catch(error =>{goDounload()})



      async function goDounload(){

        await FileSystem.downloadAsync(url, FileSystem.documentDirectory+ filename)
                  .then(({uri})=>{
                    console.log("finished downloading to", uri)
                    playTrack ()
                  })
                  .catch(error=>{
                    console.error(error);
                  });
      }



                

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

return     <TouchableOpacity style={{...styles.butTouch,height: sDisp() ? 36 : 55}}  onPress={() => {
        
    _playAndPause(sound)
    
    } }>

<View style={{...styles.activeContainerVol,height: sDisp() ? 36 : 55}}>

<Text style={{...styles.activeVolText, fontSize: sDisp() ? 16 : 20 }}>Слушать</Text>
<Ionicons  size={sDisp() ? 20 : 24} color="#fff" name="md-volume-high" />  

</View>

            </TouchableOpacity>

}

const styles = StyleSheet.create({

    activeContainerVol: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 5,
      height: 55,
      width: 150,
      justifyContent: 'center'
     
    
      },
      activeVolText: {
        fontSize: 20,
        color: '#fff',
        marginRight: 15,

      },
      butTouch: {
        width: 150,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#3A9FE7',
      
      }


})