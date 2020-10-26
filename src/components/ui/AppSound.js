import React , {useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Audio} from 'expo-av'
import * as FileSystem from 'expo-file-system'
import {THEME} from "../../theme"







export const AppSound  = ({sound}) => {

    const [playStatus,setPlayStatus] = useState({playingStatus: "nosound",url: "222222"})

    useEffect(  () => {
    
      setPlayStatus({
        playingStatus: 'nosound'
      });
    
   }, [sound])

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
    
        await FileSystem.downloadAsync(url, FileSystem.documentDirectory+ filename)
                  .then(({uri})=>{
                    console.log("finished downloading to", uri)
                  })
                  .catch(error=>{
                    console.error(error);
                  });

                

        const { sound } = await  Audio.Sound.createAsync(
            {uri:FileSystem.documentDirectory+filename},
          {
            shouldPlay: true,
            isLooping: false,
          },
          onPlaybackStatusUpdate =_updateScreenForSoundStatus,
        );
        this.sound =  sound;
       
        setPlayStatus({
          playingStatus: 'playing'
        });
      }

     

      async function _pauseAndPlayRecording() {
        if (this.sound != null) {
          
            if (playStatus.playingStatus == "stop") {
                console.log('playing...');
                await this.sound.replayAsync();
                console.log('playing!');
                setPlayStatus({
                  playingStatus: 'playing',
                });
            }
          else if (playStatus.playingStatus == 'playing') {
            console.log('pausing...');
            await this.sound.pauseAsync();
            console.log('paused!');
            setPlayStatus({
              playingStatus: 'donepause',
            });
          } else {
            console.log('playing...');
            await this.sound.playAsync();
            console.log('playing!');
            setPlayStatus({
              playingStatus: 'playing',
            });
          }
        }else if(this.sound == null){
            console.log('saund null')
        }
      }

   const  _syncPauseAndPlayRecording =   () => {

        if (this.sound != null) {
          if (playStatus.playingStatus == 'playing') {
            this.sound.pauseAsync();
          } else {
            this.sound.playAsync();
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

return     <TouchableOpacity  onPress={() => {
        
    _playAndPause(sound)
    
    } }>

<View style={styles.activeContainerVol}>

<Ionicons  size={24} color="#fff" name="md-volume-high" />  

<Text style={styles.activeVolText}>Слушать</Text>

</View>

            </TouchableOpacity>






















}

const styles = StyleSheet.create({

    activeContainerVol: {
        flexDirection: "row",
        backgroundColor: THEME.MAIN_COLOR,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        marginTop: 10
      },
      activeVolText: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 10
      }


})