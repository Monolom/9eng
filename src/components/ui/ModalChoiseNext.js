import React, {useState} from 'react'
import {View,StyleSheet,TextInput,Button,Modal,Text,TouchableOpacity,Platform,FlatList} from 'react-native'
import {THEME} from '../../theme'
import {AppButton} from '../ui/AppButton'
import { block } from 'react-native-reanimated'
import {LinearGradient} from 'expo-linear-gradient'

export const ModalChoiseNext = ({navigation,visible,Press,data,CloseModal,openWord,openPhrase,modalInfo,setPromo,type,dataList,openPrevModal}) => {






    
// const goToWord = () => {
//     navigation.navigate('WordRepeat')
//     CloseModal()
// }
// const codeArr = ['PROMO1','PROMO2','PROMO3','PROMO4']
// if(modalInfo.tich == 'Урок 2' ){
//     setPromo(codeArr[0])
// }
// if(modalInfo.tich == 'Урок 3' ){
//     setPromo(codeArr[1])
// }
// if(modalInfo.tich == 'Урок 4' ){
//     setPromo(codeArr[2])
// }
// if(modalInfo.tich == 'Урок 5' ){
//     setPromo(codeArr[3])
// }



    let  arrPhrase = []
    let  arrWord = []
    let counterPhrase = 0
  for(key in dataList.phrase){

      if(dataList.phrase[key]){
       
      }else{
        arrPhrase.push({title:key,id:counterPhrase})
        counterPhrase++
      }
  }
let counterWord = 0
  for(key in dataList.word){

    if(dataList.word[key]){
     
    }else{
        arrWord.push({title:key,id:counterWord})
        counterWord++
    }
}


    // console.log('Масивчикфразы', arrPhrase)
    // console.log('МасивчикСлова', arrWord)

   
    if(type === 'word'){
        return (

        

            <Modal animationType='slide' visible={visible} transparent={false}>
                    {/* <View>
                <Text style={{fontSize: 50}}>
                    слова
                </Text>
            </View> */}
          
               <View style={{...styles.header,height: Platform.OS == 'ios'? 100 : 60 }} >

              <LinearGradient  style={{...styles.headerGradient, }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#FF99AA', '#FF9CB7', '#F09FC6']} >

              <View style={{flex: 1,justifyContent: 'space-between',flexDirection: 'row',minWidth: '80%', marginBottom: Platform.OS == 'ios' ? 30 : 0,alignItems: Platform.OS == 'ios' ? 'flex-end' : 'center',height: '100%'}}>
              <Text style={styles.headerLeson}>{modalInfo.tich}</Text>
              <Text style={styles.headerLeson}>Cлова</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end',width: '50%', }}>
                   <Text style={styles.headerTextAkcent}>{modalInfo.index}</Text>
                    </View>
               </View>

                 </LinearGradient>

               </View>


            <View style={{...styles.buttonWrap}}>



                <FlatList style={{
   
      width: '100%',
      maxHeight: (arrWord.length + 1 ) * 60,
      paddingHorizontal: '14%'
   }} showsVerticalScrollIndicator={false} data={arrWord} keyExtractor={post => post.id.toString() } renderItem={({item}) => ( 



<TouchableOpacity onPress={()=>{openWord(item.title)}} style={{...styles.buttonExit,width: '100%',}}>
           <Text style={styles.buttonExitText}>

            {item.title}

            </Text>
          </TouchableOpacity>

)} />

            
            {/* <TouchableOpacity onPress={openWord} style={{...styles.buttonExit,width: '65%',}}>
           <Text style={styles.buttonExitText}>

             Повторить слова1111

            </Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={openPhrase} style={{...styles.buttonExit,marginBottom: 50,width: '65%',}}>
       <Text style={styles.buttonExitText}>

              Повторить фразы

        </Text>
           </TouchableOpacity> */}
            
         <TouchableOpacity onPress={()=>{openPrevModal(),Press()}} style={styles.buttonExit}>
         
         <Text style={{...styles.buttonExitText,backgroundColor: "#9E8AE3"}}>
             Назад
           </Text>
          </TouchableOpacity>

        </View>
            
            </Modal>
    
            )
    }
        else{

        return (



            <Modal animationType='slide' visible={visible} transparent={false}>
                    {/* <View>
                <Text style={{fontSize: 50}}>
                    слова
                </Text>
            </View> */}
          
               <View style={{...styles.header,height: Platform.OS == 'ios'? 100 : 60 }} >

              <LinearGradient  style={{...styles.headerGradient, }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#FF99AA', '#FF9CB7', '#F09FC6']} >

              <View style={{flex: 1,justifyContent: 'space-between',flexDirection: 'row',minWidth: '80%', marginBottom: Platform.OS == 'ios' ? 10 : 0,alignItems: Platform.OS == 'ios' ? 'flex-end' : 'center',height: '100%'}}>
              <Text style={styles.headerLeson}>{modalInfo.tich}</Text>
              <Text style={styles.headerLeson}>Фразы</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end',width: '50%', }}>
                   <Text style={styles.headerTextAkcent}>{modalInfo.index}</Text>
                    </View>
               </View>

                 </LinearGradient>

               </View>


            <View style={{...styles.buttonWrap}}>



                <FlatList style={{
   
      width: '100%',
      maxHeight: (arrPhrase.length + 1 ) * 60,
      paddingHorizontal: '14%'
   }} showsVerticalScrollIndicator={false} data={arrPhrase} keyExtractor={post => post.id.toString() } renderItem={({item}) => ( 



<TouchableOpacity onPress={()=>{openPhrase(item.title)}} style={{...styles.buttonExit,width: '100%',}}>
           <Text style={styles.buttonExitText}>

            {item.title}

            </Text>
          </TouchableOpacity>

)} />

            
            {/* <TouchableOpacity onPress={openWord} style={{...styles.buttonExit,width: '65%',}}>
           <Text style={styles.buttonExitText}>

             Повторить слова1111

            </Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={openPhrase} style={{...styles.buttonExit,marginBottom: 50,width: '65%',}}>
       <Text style={styles.buttonExitText}>

              Повторить фразы

        </Text>
           </TouchableOpacity> */}
            
         <TouchableOpacity onPress={()=>{openPrevModal(),Press()}} style={styles.buttonExit}>
         
         <Text style={{...styles.buttonExitText,backgroundColor: "#9E8AE3"}}>
             Назад
           </Text>

          </TouchableOpacity>

        </View>
            
            </Modal>


            )
    }

    
}
const styles = StyleSheet.create({
    headerGradient: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
     
        paddingHorizontal: '5%',

    },
    header: {
        color: '#fff',
       width: '100%',
    

    },
    headerLeson: {
        fontSize: 24,
        color: '#fff'
    },
    headerText: {
        fontSize: 24,
        color: '#fff'
    },
    headerTextAkcent: {
        fontSize: 30,
        color: '#3A9FE7',
        marginLeft: 10
    },
    buttonWrap: {
      flex: 1,
      height: '100%',
      width: '100%',
      alignItems: "center",
      alignContent: "center",
      justifyContent: 'center'
    },
    buttonExitText: {
        width: '100%',
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#fff',
        backgroundColor: "#3A9FE7"
  
    },
    buttonExit: {
        width: '35%',
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: 30

        
    }

})