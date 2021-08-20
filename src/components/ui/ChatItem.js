import React, {useState,useRef,useEffect} from 'react'
import {ImageBackground,View,StyleSheet,TouchableOpacity,Button,Modal,Text,Image,Dimensions,Animated,Platform} from 'react-native'

import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'



export const ChatItem  = ({sound,en,ru,first,index,firstSound,soundPlay,state,dButton,buttonState,closeSound}) => {
    const opasityItemChat = useRef(new Animated.Value(0)).current;
    const topItemChat = useRef(new Animated.Value(10)).current;
    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})
    let soundBox = ''
    useEffect(  () => {
      
      
  if(closeSound){

    soundbox.unloadAsync()
    setPlayStatus({ playingStatus: "stop" })
    
  }
      

   }, [closeSound])
    

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


const getNumberPhrase = (index) => {
  if(index >= 9){
    return index
  }
  else {
    return "0"+ (index+1)
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
        soundbox.unloadAsync()
        dButton(false)
        setPlayStatus({ playingStatus: "stop" });
        // if(typeof soundbox !== 'undefined'){
        //   console.log("ебобобо",)
        // }else{
        //   console.log("не ебобобо",)
        // }
      }
  };

    async function _playRecording(url) {
        // console.log('gtht',url)
        var arr = url.toString().split("/")     
        // console.log(`uri for sound: ${url}`)    
        var filename = arr[arr.length-1]
  

    await  FileSystem.getInfoAsync(FileSystem.documentDirectory+filename)
  .then(success =>{
    if(success.exists){
      // console.log('фаил есть',success.exists)
      playTrack()
    
  }else{
      // console.log('фаил нет',success.exists)
      goDounload()
  }
  })
  .catch(error =>{console.error(error);})



      async function goDounload(){

        await FileSystem.downloadAsync(url, FileSystem.documentDirectory+ filename)
                  .then(({uri})=>{
                    // console.log("finished downloading to", uri)
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
                // console.log('playing...');
                await soundbox.replayAsync();
                // console.log('playing!');
                setPlayStatus({
                  playingStatus: 'playing',
                });
            }
          else if (playStatus.playingStatus == 'playing') {
            // console.log('pausing...');
            await soundbox.pauseAsync();
            // console.log('paused!');
            setPlayStatus({
              playingStatus: 'donepause',
            });
          } else {
            // console.log('playing...');
            await soundbox.playAsync();
            // console.log('playing!');
            setPlayStatus({
              playingStatus: 'playing',
            });
          }
        }else if(soundbox == null){
            // console.log('saund null')
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
 






{/* <View >
<TouchableOpacity   onPress={() => {_playAndPause(sound)}} style={{width: sDisp() ? 35:45,height: sDisp() ? 35: 45}} >
  <View style={{...styles.icon,width: sDisp() ? 35:45,height: sDisp() ? 35: 45}}>
<Ionicons name={"md-volume-high"} size={sDisp() ? 25:35} color="#fff" />
</View>
  </TouchableOpacity>
</View> */}




}

const styles = StyleSheet.create({

    chatWraper: {
        flex: 1,
        // backgroundColor: '#f53',
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
        // backgroundColor: '#3ff',
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
