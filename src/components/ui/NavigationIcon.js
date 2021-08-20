import React,{useEffect} from 'react'
import {View,Text,Image} from 'react-native'
import {loadUser} from '../../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import {loadTicher} from '../../store/actions/ticher'

export const NavigtionIcon = ({info})=>{
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(loadUser())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(loadTicher())
    }, [dispatch])
    
const allUser = useSelector(state => state.user.allUser)
const allTicher = useSelector(state => state.ticher.allTicher)
const isEmpityObj = (obj) => {
    for (let key in obj) {
      // если тело цикла начнет выполняться - значит в объекте есть свойства
      return false;
    }
    return true;
  }
const  filterData = (data, type) => {
    const getRepeatStatus = (obj) => {

      const myObj = obj

      let result = true

      for(var key in myObj){

          for(var key2 in myObj[key]){
            
            if(myObj[key]['repeat'] < 3){
              return false
            }
          
          }
      }

      return result

    }

  

     const getTimeItem = (id,type,title) =>{
        return allUser.repeat[id][type][title]['time']
     }

    const getFinalState = (id,type) => {
        
        let valueArr = []
        let maxValue = 0
        const checkDataRef = allUser.repeat[id][type]
        for(key in checkDataRef){
          for(var key2 in checkDataRef[key]){
            valueArr.push(checkDataRef[key]['time'])
          }
        }
        const filterValueArr =  valueArr.filter(value => value > maxValue)
        
        if (valueArr.length - filterValueArr.length === 1 ){
          return true
        }else{
          return false
        }
    }
    
    const blockData = (id) => {
     
          const checkDataRef = allUser.repeat[id-1]
     
        if(id === '1'){

          return false

        }
      else if (getRepeatStatus(checkDataRef['word']) && getRepeatStatus(checkDataRef['phrase'])){

        return false

      }
      else {
        return true
      }
      return true
    } 
   


   
  

    const Arr = []

    for(let key in data){
      const idTich  = data[key]['id']
      // console.log('название урока', allTicher[key]["data"]['word'])
     for(let go in data[key]["data"][type === 'word'? 'word': "phrase"]) {
     
        Arr.push({  
          id: idTich,
          title: go,
          block: blockData(idTich),
          final: getFinalState(idTich,type),
          time: getTimeItem(idTich,type,go),
          type: type,
          repeat: allUser.repeat[idTich][type][go]['repeat'],
        })
     }
  
    }

    const filterTichProgress = (id,type,repeat) => {
      let result = false
    
      const obj = allUser.repeat[id][type]
      const obj2 = allUser.repeat[id][type==='word'? 'phrase': 'word']
       for(key in obj){
         if(obj[key]['repeat'] < repeat){
           result = true
         }
       }
       for(key in obj2){
         if(obj2[key]['repeat'] < repeat){
           result = true
         }
       }

      if(repeat === 1){
        result = false
      }
      return result
    }

    const filterTimeProgress = (repeat,time) => {
      let checkDate = new Date()
      let curentDate = checkDate.getTime()
      if(repeat === 1){
        return false
      }else if(repeat === 2){
        if (curentDate  -  time >= 0 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }
      else if(repeat === 3){
        if (curentDate  -  time >= 0 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }
      else if(repeat === 4){
        if (curentDate  -  time >= 0 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }
      else if(repeat === 5){
        if (curentDate  -  time >= 0 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time - 1440000)
          return true
        }
      }
      else if(repeat === 6){
        if (curentDate  -  time >= 180000 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }else if(repeat === 7){
        if (curentDate  -  time >= 180000 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }else if(repeat === 8){
        if (curentDate  -  time >= 180000 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }else if(repeat === 9){
        if (curentDate  -  time >= 180000 ){
        return false
        }else{
          console.log("осталось",curentDate  -  time)
          return true
        }
      }
    }
    const filterFunction=(value)=>{
      if(value.block === true){
        return false
      }else if (value.repeat < 1){
        return false
      }else if (value.repeat > 8){
        return false
      }
      // else if (filterTichProgress(value.id,value.type,value.repeat)){
      //   return false
      // }
      else if (filterTimeProgress(value.repeat,value.time)){
        return false
      }
      // else  if(filterTimeProgress)
      else{  return true}
    }
    const baseArr = Arr.filter(filterFunction)
    // console.log('чё за массив',baseArr)
    return baseArr    
 }

 if( !isEmpityObj(allUser)){
    console.log('тест', filterData(allTicher,'phrase'))
    const notficationNumber = filterData(allTicher,'phrase').length + filterData(allTicher,'word').length

        return   <View style={
            {  position: 'relative',width: 40,height: 40,justifyContent: 'center',alignContent: 'center',alignItems: 'center', backgroundColor: '#fff',}
            }>
              {/* <View style={{position: 'absolute',width: '50%',height: '100%',left: 0,backgroundColor: '#f3f'}}>
    
              </View> */}
               <Image  style={{width:'90%',height: '90%'}}
              source={info.focused ? require('../../../assets/img/activeMenu.png') : require('../../../assets/img/deactiveMenu.png') }>
              </Image>
           
        {      notficationNumber > 0 ?  <View style={{position: 'absolute', width: 17, height: 17,backgroundColor: '#e10918',borderRadius: 15,justifyContent: 'center',alignItems: 'center',right: 0,top: 1.5}}>
                <Text style={{color: '#fff',fontSize: notficationNumber > 9 ?10 : 12,fontFamily: 'gilory-ebold'}}>
                 {notficationNumber}
                </Text>
              </View>: null}
    
            </View> 



 }else{

    const notficationNumber = 0






    return   <View style={
        {  position: 'relative',width: 40,height: 40,justifyContent: 'center',alignContent: 'center',alignItems: 'center', backgroundColor: '#fff',}
        }>
          {/* <View style={{position: 'absolute',width: '50%',height: '100%',left: 0,backgroundColor: '#f3f'}}>

          </View> */}
           <Image  style={{width:'90%',height: '90%'}}
          source={info.focused ? require('../../../assets/img/activeMenu.png') : require('../../../assets/img/deactiveMenu.png') }>
          </Image>
       
          {      notficationNumber > 0 ?  <View style={{position: 'absolute', width: 17, height: 17,backgroundColor: '#e10918',borderRadius: 15,justifyContent: 'center',alignItems: 'center',right: 0,top: 1.5}}>
                <Text style={{color: '#fff',fontSize: notficationNumber > 9 ?10 : 12,fontFamily: 'gilory-ebold'}}>
                 {notficationNumber}
                </Text>
              </View>: null}

        </View> 


 }



}