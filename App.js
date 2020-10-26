import React , {useEffect, useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Platform,InteractionManager,ActivityIndicator,Modal} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {AppLoading} from 'expo'
import {Provider} from 'react-redux'
import { AppNavigation } from './src/navigation/AppNavigation'
import store from './src/store'
import { THEME } from './src/theme'
// import {firebase} from './src/firebase/config'
import { set } from 'react-native-reanimated'
import {USERDATA} from './src/loginData'
import {PROMO} from './src/promoData'
import * as Font from 'expo-font'
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';








export default function App() {

// FIX TIMEOUT
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

  
  // FORM
  const [fullName, setFullName] = useState('')
  const [fullNameDuble, setFullNameDuble] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadLoginModal, setLoadLoginModal] = useState(false)
  const [promoState,setPromoState] = useState('')
  const [deletePromo,setDeletePromo] = useState({status: false, key: false})





  // FORM



  const  [isReady,setIsReady] = useState(false)

  const [isLogin,setIsLogin] = useState(undefined)

  const [loginNav,setLoginNav] = useState('buttons')




// check duble name

useEffect(()=>{

    let queryName = firebase.database().ref("users")

    queryName.once("value")

.then(function(snapshot) {
 var array = snapshot.val()
 for (var i in array){
     let value = array[i]
    //  console.log(value.fullName);
     if(value.fullName === fullName ){
         setFullNameDuble(true)
         console.log('хопа')
         break
     }else(
        setFullNameDuble(false)
     )
 }
})
},[fullName])


useEffect(()=>{
    setDeletePromo({status: false,key:false})

    if(promoState == 'DIMAFOMA'){
        setDeletePromo({status: true,key: 'DIMAFOMA' })
    }else{


    
        if(promoState.length == 8){


            console.log('вы ввели 8')
           
            const usersRef = firebase.database().ref('userPromo')

            usersRef
                .once('value')
                .then(userData => {
                  let obj = userData.val()
                //   console.log('скачали', obj["29789"])
                    for(var key in obj){
//Заплатка
                        if(obj[key] == promoState){

                            setDeletePromo({status: true,key})
                          
                        }
                
                    }
                 
                })
                .catch(error => {

                    alert('ошибка загрузки промо', )
                    // alert(error)

                });


        }else{
            setDeletePromo({status: false,key:false})
        }
    }


},[promoState])


console.log('delete state', deletePromo)
 

async function loadFirebase (){

    const firebaseConfig = {
        apiKey: "AIzaSyD9ytFW5Mhe2bAZaYQRtJPRrFaHvVMn7LU",
        authDomain: "eng-dev-de51e.firebaseapp.com",
        databaseURL: "https://eng-dev-de51e.firebaseio.com",
        projectId: "eng-dev-de51e",
        storageBucket: "eng-dev-de51e.appspot.com",
        messagingSenderId: "844765440012",
        appId: "1:844765440012:web:f527ae909569319f8fe629",
        measurementId: "G-39FQN76CJL"
    };
    
    if (!firebase.apps.length) {
      await  firebase.initializeApp(firebaseConfig);
    }
    
}

useEffect(()=>{
   
    loadFirebase()

},[])

useEffect(()=>{

    console.log("Длина прилы",firebase.apps.length)
    console.log('старт')
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            console.log("Длина прилы",firebase.apps.length)
            console.log('финиш')
            setIsLogin(true)
        
        } else {
            console.log("Длина прилы",firebase.apps.length)
            console.log('финиш')
            setIsLogin(false)

        }

      })


},[])

useEffect(()=>{

    firebase.auth().onAuthStateChanged(user => {

        if (user) {
     
            setIsLogin(true)
        
        } else {
     
            setIsLogin(false)

        }

      })


},[isLogin])









const onLoginPress = () => {


    

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.database().ref('users')
            usersRef
                .child(uid)
                .once('value')
                .then(userData => {
                    setLoadLoginModal(false)
                  console.log(userData.child('fullName'))
                })
                .catch(error => {
                    alert('ошибка логина2', )
                    setLoadLoginModal(false)
                    alert(error)
                });
        })
        .catch(error => {
            setLoadLoginModal(false)
            alert('ошибка логина', )
            alert(error)
        })
}


async function wrapsRegister(params) {
    if(fullName.length <= 1){
        setLoadLoginModal(false)
      await  alert('Введите имя (минимально два символа)')
       return
    }

 
    if(fullNameDuble){
        setLoadLoginModal(false)
         alert("Имя занято")
    }else {
    

    if (password !== confirmPassword) {
        setLoadLoginModal(false)
         alert("Пароли не совпадают")
        return
    }

     firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
                point:0
            };

            const usersRef = firebase.database().ref('users')
            const usersRefData = firebase.database().ref('usersData')
         
            usersRefData.child(uid).set(USERDATA).then(() => {
              
            console.log('запись прошла')

            }).catch((error) => {

            console.log('ошибка дата', error)
               
            })
            usersRef
                .child(uid)
                .set(data)
                .then(() => {
                    setLoadLoginModal(false)
                   console.log("Готово", uid)
                })
                .catch((error) => {
                    setLoadLoginModal(false)
                    console.log('ошибка записи в БД', error)
                    alert(error)
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                setLoadLoginModal(false)
              alert('Введите более надёжный пароль (минимум 6 символов)');
            }else if (errorCode == 'auth/email-already-in-use') {
                setLoadLoginModal(false)
                alert('Пользователь с данным email уже зарегестрирован');
              }
              else if (errorCode == 'auth/invalid-email') {
                setLoadLoginModal(false)
                alert('Недействительный адрес электронной почты');
              }
              else if (errorCode == 'auth/operation-not-allowed') {
                setLoadLoginModal(false)
                alert('Недействительный адрес электронной почты');
              }
             else {
                setLoadLoginModal(false)
              alert(errorCode);
            }
            setLoadLoginModal(false)
            console.log(errorCode);  
    });

}
}
    
  async function onRegisterPress () {

    setLoadLoginModal(true)
    if(promoState < 8){
        setLoadLoginModal(false)
     alert('Код доступа должен быть 8 символов')
       return
    }
    
    if(deletePromo.status == false){

     const usersRef = firebase.database().ref('userPromo')

        usersRef
            .once('value')
            .then(userData => {
              let obj = userData.val()
            //   console.log('скачали', obj["29789"])
                for(var key in obj){

                    if(obj[key] == promoState ){
                        return true
                    }
            
                }
                return false
            }).then(function (status) {
                if(status){

                    const refPromoDel = firebase.database().ref('userPromo')

                    refPromoDel.child(deletePromo.key).remove().then(
                        ()=> {
                            console.log('Регестрация без')
                            
                            wrapsRegister() 
                        }
                    )

                }
                else{
                    setLoadLoginModal(false)
                    alert('Код доступа недествителен')
                     return  
                }
            })



            // .catch(error => {

            //     alert('ошибка загрузки промо', )
            //     // alert(error)

            // });


    // }else{
    //     setDeletePromo({status: false,key:false})
    // }
    

       
    }else{
        if(deletePromo.key ){
            if(deletePromo.key == 'DIMAFOMA'){
                wrapsRegister() 
            }else{
            const refPromoDel = firebase.database().ref('userPromo')

            refPromoDel.child(deletePromo.key).remove().then(
                ()=>{

                    console.log('Регестрация с')
                    wrapsRegister() 
                    
                }
            )
        }
        }else{
            setLoadLoginModal(false)
              alert('Ошибка промо')
             return
          }
        
    
    }







}


async function bootstrap (){

    

    await Font.loadAsync({
        'open-bold' : require('./assets/font/Roboto-Bold.ttf'),
        'open-regular' : require('./assets/font/Roboto-Regular.ttf')
    })

  

}
  

if(!isReady || isLogin === undefined){
      
    return (



      <AppLoading

      style={{backgroundColor: THEME.AKCENT_COLOR ,width: '100%',height: '100%'}}

      startAsync = {bootstrap}

      onFinish = {() => setIsReady(true)}

      onError = {err => console.log(err)}  />
    )   

  }else{





if(isLogin){

  
  return (
<Provider store={store}>
<AppNavigation /> 
</Provider>
  ) 
}else{

  if(loginNav === 'buttons'){
    
  return (
 
    <View style={styles.container}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>  setLoginNav('login')}>
                    <Text style={styles.buttonTitle}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>  setLoginNav('reg')}>
                    <Text style={styles.buttonTitle}>Регистрация</Text>
                </TouchableOpacity>
    </View>
  
  )

  }
  if(loginNav === 'reg'){

   
        return (
            <View style={styles.container}>
                 <KeyboardAwareScrollView
                     style={{ flex: 1, width: '100%' }}
                     keyboardShouldPersistTaps="always">
                     <TextInput
                         style={styles.input}
                         placeholder='promo'
                         placeholderTextColor="#aaaaaa"
                         onChangeText={(text) => setPromoState(text)}
                         value={promoState}
                         underlineColorAndroid="transparent"
                         autoCapitalize="none"
                     />
                     <TextInput
                         style={styles.input}
                         placeholder='Full Name'
                         placeholderTextColor="#aaaaaa"
                         onChangeText={(text) => setFullName(text)}
                         value={fullName}
                         underlineColorAndroid="transparent"
                         autoCapitalize="none"
                     />
                     <TextInput
                         style={styles.input}
                         placeholder='E-mail'
                         placeholderTextColor="#aaaaaa"
                         onChangeText={(text) => setEmail(text)}
                         value={email}
                         underlineColorAndroid="transparent"
                         autoCapitalize="none"
                     />
                     <TextInput
                         style={styles.input}
                         placeholderTextColor="#aaaaaa"
                         secureTextEntry
                         placeholder='Password'
                         onChangeText={(text) => setPassword(text)}
                         value={password}
                         underlineColorAndroid="transparent"
                         autoCapitalize="none"
                     />
                     <TextInput
                         style={styles.input}
                         placeholderTextColor="#aaaaaa"
                         secureTextEntry
                         placeholder='Confirm Password'
                         onChangeText={(text) => setConfirmPassword(text)}
                         value={confirmPassword}
                         underlineColorAndroid="transparent"
                         autoCapitalize="none"
                     />
                     <TouchableOpacity
                         style={styles.button}
                         onPress={() => onRegisterPress()}>
                         <Text style={styles.buttonTitle}>Create account</Text>
                     </TouchableOpacity>
     
                     <TouchableOpacity
                         style={styles.button}
                         onPress={() => { 
                         setLoginNav('buttons')
                         setFullName('')
                         setEmail('')
                         setPassword('')
                         setConfirmPassword('')
                         }}>
                         <Text style={styles.buttonTitle}>Назад</Text>
                     </TouchableOpacity>
     
     
                     <TouchableOpacity
                         style={styles.button}
                         onPress={() => { 
                             firebase.auth().signOut()
                         }}>
                         <Text style={styles.buttonTitle}>Разлог</Text>
                     </TouchableOpacity>
     
     
            
                     {/* <View style={styles.footerView}>
                         <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                     </View> */}
                 </KeyboardAwareScrollView>
     
     
                 <Modal
                 animationType='fade' visible={loadLoginModal} transparent={true} 
                 >
     <View style={styles.loadingContainer}>
     
     <ActivityIndicator size="large" color="#000"  />   
     </View>
                 </Modal>
     
             </View>
         )

    
   

  }
  if(loginNav === 'login'){
    return (

      <View style={styles.container}>
      <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
        
          <TextInput
              style={styles.input}
              placeholder='E-mail'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder='Password'
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <TouchableOpacity
              style={styles.button}
              onPress={() => onLoginPress()}>
              <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setLoginNav('buttons')
                                        setEmail('')
                                        setPassword('')
                    }}>
                    <Text style={styles.buttonTitle}>Назад</Text>
                </TouchableOpacity>
          
          {/* <View style={styles.footerView}>
              <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
          </View> */}

      </KeyboardAwareScrollView>
      
      <Modal
            animationType='fade' visible={loadLoginModal} transparent={true} 
            >
<View style={styles.loadingContainer}>

<ActivityIndicator size="large" color="#000"  />   
</View>
            </Modal>
            
  </View>

    )
  }

}
}
}  


const styles = StyleSheet.create({
  directContainer: {
      paddingTop: 70,
      paddingBottom: 70,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%' ,
  },
  // button: {
  //   paddingHorizontal: 20,
  //   paddingVertical: 20,
  //   backgroundColor: THEME.MAIN_COLOR,
  //   width: 240,
  //   color: "#fff",
  //   fontSize: 20,
  //   marginBottom: 20,
  //   borderRadius: 5,
  //   textAlign: "center"

  // },
  container: {
    flex: 1,
    // alignItems: 'center',
    marginTop: 60
},
title: {

},
logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
},
input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: '#000',
    borderWidth: 1
},
button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
},
footerText: {
    fontSize: 16,
    color: '#2e2e2d'
},
footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
},
loadingContainer: {
    height: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.3
}

})


