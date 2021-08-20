import React, {useState,useRef,useEffect} from 'react'
import {ImageBackground,View,StyleSheet,TouchableOpacity,Button,Modal,Text,Image,Dimensions,Animated,Platform} from 'react-native'
import {Ionicons,FontAwesome5} from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { WordSound } from './WordSound'
import {refreshRepeat} from '../../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import  {PanGestureHandler,GestureHandlerRootView } from 'react-native-gesture-handler'

export const NewModalTest = ({navigation}) => {

    

    const data = JSON.stringify(navigation.getParam('data', undefined))
    const curent = JSON.stringify(navigation.getParam('curent', undefined))
    const base = JSON.stringify(navigation.getParam('base', undefined))




    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

const handleGesture = (evt) =>{
    let{nativeEvent} = evt
        console.log(nativeEvent)
    }

    if(true){

    const goToModal = () => {

            navigation.goBack()
        
          }

     
  
    //  setArrLength({curent: 0, length:  data[curent.index]['data']['word'][curent.theme].length})

        if(true){
   
        return (


        
<View style={{flex: 1,backgroundColor: "#f3f"}}>

                {/* <PanGestureHandler  
                activeOffsetX={[0, 0]}
                onGestureEvent={handleGesture}>

           <View style={{
                    
                    backgroundColor: '#fff',
                    width: windowWidth, height: windowWidth,
                    position: 'absolute',
                    zIndex: 140,
                    elevation: 140
                  }}>

           </View>

</PanGestureHandler>  */}

        <TouchableOpacity onPress={()=>{goToModal()}}>
                <Text style={{width: 100,height: 100, backgroundColor: '#f3f',fontSize: 50,color: '#000'}}>Modal</Text>
        </TouchableOpacity>

        <Text>
            {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
</View>
    
            )

                     
        }
        else {
            return (
                
                null
            )
        }
    }else {
        return (


        

            <Modal  visible={visible} transparent={true} repeat>
                


                <View style={styles.directContainer}>
    
                 <View style={styles.topContainer}>
                 <Image style={{width: windowWidth, height: windowWidth}} source={ require('../../../assets/img/word_test.jpg')}>
    
    </Image>
    
    <View style={styles.textWrpaer}>
       
<TouchableOpacity onPress={()=> {
    console.log('звук')
}}>


    <Text style={styles.preSpan}>нажмите чтобы прослушать ещё раз</Text>
    <View style={styles.midleButton}>

        <View  style={{width: '100%'}} >
        <Text style={{...styles.bigWord,paddingVertical: 0,}}>open</Text>
        <Text style={styles.bigWordLight}>(оупен)</Text>
        </View>
        <View style={{position: 'absolute', right: 20,top: 20}} >
        <Ionicons  size={40} color="#fff" name="md-volume-high" />  
        </View>
          
    </View>
    </TouchableOpacity>
            
    </View>
    
                 </View>


       
                <ScrollView     
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y : scrollIndicator } } }],
                  { useNativeDriver: false },
                )}
                onLayout={(e)=>{
                  setVisibleScrollContainer(e.nativeEvent.layout.height /100 * 80)
                  setVisibleScrollBar(false)
                }}
                onContentSizeChange={(width, height) => {
                  setContentSize(height /100 * 80);
                }}
                style={{width: '100%'}} >
                <Text style={styles.underSpan} >
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                    открыть (оупен) - ОТКРЫТЬ ПЕНЬ - ОУПЕН
                </Text>
             

            </ScrollView>
 
         
            <View style={{...styles.scrolBarContainer, height: visibleScrollContainer, top: windowWidth +120 }}>
{visibleScrollBar ? null :
                    <Animated.View style={{...styles.scrolBar,height: scrollIndicatorSize ,top: scrollIndicatorPosition }} >

                    </Animated.View>}

                </View>
               
    
            <View style={styles.textWraperBottom}>
    
                
            {/* <Text style={{...styles.preSpan,textAlign: 'center'}}>
                нажмите чтобы открыть перевод
            </Text> */}

         
         
            <TouchableOpacity style={{width: '100%', alignSelf: "flex-end" }} onPress = {() => {
             goFirstDisplay()
              }}>
    
            <Text style={{...styles.bottomButton, alignSelf: 'flex-end'}}>
    
                далее1
    
            </Text>
    
            </TouchableOpacity>
    
            </View>
    
    
    
    
             <View style={styles.progBarWrap}>
                        <View style={styles.progBar}  >
                            <View style={styles.barIndicator}>
                            </View>
    
                        </View>
                        <TouchableOpacity style={{   position: 'absolute',
           right: -56,
           top: 11}} onPress={()=>{console.log('хуй')}}>
                        <Image style={styles.closeButton} source={  require('../../../assets/img/close.png')}></Image>  
                        </TouchableOpacity>
                 
                    </View>
               
                </View>
    
            </Modal>
    
            )
    }



    }
const styles = StyleSheet.create({
    
   directContainer: {
       flex: 1,
       justifyContent:'space-between',
       alignContent: "center",
       alignItems: 'center',
       backgroundColor: '#fff',
       position: 'relative',
       flexDirection: 'column',
       position: 'absolute',
       
      
   },
   progBarWrap : {
       width: '100%',
       position: 'absolute',
       height : 50,
       justifyContent: 'center',
       flexDirection: 'row' ,
       alignItems: 'center',
      
 
   },
   closeButton: {
       width: 28,
       height: 28,
       marginLeft: 15
 
    
   },
   progBar : {
       width: '60%',
       height: 4,
       borderRadius: 2,
       justifyContent: 'flex-start',
       backgroundColor: 'rgba(160, 160, 160,0.2)',
       flexDirection: 'row'
   },
   barIndicator: {
       backgroundColor: '#42a9e0',
       flex: 0.2,
       
   },
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
   textWrpaer: {
    width: '100%'
   },
   bigWord: {

    maxWidth: '100%',
    paddingHorizontal: '10%',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'sfUi-bold',
    paddingVertical: 5,
    letterSpacing: 1

   },

   textWraperBottom : {
       width: '100%',
       alignSelf: 'flex-start',
     
   },
   bottomButton: {

       fontFamily: 'circe-ebold',
       fontSize: 20,
       width: '100%',
       paddingVertical: 15,
       backgroundColor: "#22b312",
       color: '#fff',
       textAlign: 'center',
       textTransform: 'uppercase',
       letterSpacing: 0.7
  
   },
   topContainer: {
       width: '100%'
   }
   ,
   bigWordLight: {
       fontFamily: 'sf-light',
       fontSize: 16,
       color: '#fff',
       paddingHorizontal: '10%',
       marginBottom: 10
   },
   midleButton: {
    backgroundColor: '#42a9e0',
    color: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
   },
   underSpan : {
    fontFamily: 'sf-light',
    fontSize: 14,
    paddingHorizontal: '10%',
    marginBottom: 10,
    paddingTop: 10,

   },
   scrollContainer: {
       width: '100%',
       position: 'relative' 
   },
   scrolBarContainer: {
       width: 2,
       height: '90%',
       backgroundColor: 'rgba(160, 160, 160,0.2)',
       position: 'absolute',
       right: 20,
       top: 10,
     
   },
   scrolBar : {
       height: '10%',
       width: 2,
       backgroundColor: '#42a9e0',
       position: 'absolute',
       top: 20

   },
 

})