import React , {useEffect, useState} from 'react'
import {Animated,Image,ImageBackground, StyleSheet, Text, View,TouchableOpacity,TextInput,Platform,InteractionManager,ActivityIndicator,Modal,Dimensions,Alert,Linking} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {AppLoading} from 'expo'
import {LinearGradient} from 'expo-linear-gradient'
import {Provider} from 'react-redux'
import { AppNavigation } from './src/navigation/AppNavigation'
import store from './src/store'
import { THEME } from './src/theme'
// import {firebase} from './src/firebase/config'
import { color, set } from 'react-native-reanimated'
import {TICHER} from './src/newData3'
import {USERDATA} from './src/loginData'
import {PROMO} from './src/promoData'
import * as Font from 'expo-font'
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import {Ionicons,FontAwesome5} from '@expo/vector-icons'
import NetInfo from '@react-native-community/netinfo'
import * as Application from 'expo-application'
import Constants from 'expo-constants'
import { Asset } from 'expo-asset'
import * as SplashScreen from 'expo-splash-screen'

export default function App() {


   

// console.log('уникальный id', Application.androidId)

console.log('уникальный id', typeof Constants.installationId)    

const unicalDeviceId = Constants.installationId

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

//interne state 

const [interConect , setInterConect] = useState(false)

  
  // FORM
  const [fullName, setFullName] = useState('')
  const [fullNameDuble, setFullNameDuble] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadLoginModal, setLoadLoginModal] = useState(false)
  const [promoState,setPromoState] = useState('')
  const [deletePromo,setDeletePromo] = useState({status: false, key: false})
  const [registerButton,setRegisterButton] = useState(false)
  const [loginButton,setLoginButton] = useState(false)
  const[interpreterVision,setInterpreterVision] = useState({fadeAnimation: new Animated.Value(0.5)})  
  const[interpreterVision2,setInterpreterVision2] = useState({fadeAnimation: new Animated.Value(0.5)})  
  const [curentLoginId,setCurentLoginId] = useState("")



//   const interpreterToogle = () => {
//     if(interpreterVision.value == 0){
//       setInterpreterVision({...interpreterVision,value:1})
//       // console.log('гол',interpreterVision.fadeAnimation )
//       ifadeIn()
      
//     }else{
//       setInterpreterVision({...interpreterVision,value:0})
//       ifadeOut()
//       // console.log('штанга',interpreterVision.fadeAnimation )
     

//     }
//   }



  const ifadeIn = () => {
    Animated.timing(interpreterVision.fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const ifadeOut = () => {
    Animated.timing(interpreterVision.fadeAnimation, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  const ifadeIn2 = () => {
    Animated.timing(interpreterVision2.fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const ifadeOut2 = () => {
    Animated.timing(interpreterVision2.fadeAnimation, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  // FORM

  function goAlert(text){
    Alert.alert(
        "Ошибка",
        text,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
  }





//   const windowHeight = Dimensions.get('window').height;

  const  [isReady,setIsReady] = useState(false)

  const [isLogin,setIsLogin] = useState(undefined)

  const [loginNav,setLoginNav] = useState('buttons')

  const [uDeviceScreen,setuDeviceScreen] = useState(false)



  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // await SplashScreen.hideAsync()
        // Pre-load fonts, make any API calls you need to do here

        await Promise.all([
            await Asset.loadAsync([
                require('./assets/img/BG.jpg'),
                require('./assets/img/BG.png'),
                require('./assets/img/logo.png'),
                require('./assets/img/hLogo.png'),
                require('./assets/img/word_img_1.png'),
                require('./assets/img/word_img_2.png'),
                require('./assets/img/word_img_3.png'),
                require('./assets/img/block.png'),
                require('./assets/img/phrase_img_1.jpg'),
                require('./assets/img/phrase_img_2.jpg'),
                require('./assets/img/phrase_img_3.jpg'),
                require('./assets/img/close.png'),
                require('./assets/img/word_test.jpg'),
                require('./assets/img/finalwordbg.jpg'),
                require('./assets/img/test_dialog_bg_img.png'),
                require('./assets/img/sound.png'),
                require('./assets/img/star_5.png'),
                require('./assets/img/star_6.png'),
                require('./assets/img/star_1.png'),
                require('./assets/img/star_2.png'),
                require('./assets/img/star_3.png'),
                require('./assets/img/star_4.png'),
                require('./assets/img/repat1.png'),
               require('./assets/img/repat2.png'), 
                require('./assets/img/heart1.png'),
                require('./assets/img/heart2.png'),
                require('./assets/img/profile.png'),
    
    
                require('./assets/icon/01a.png'),
                require('./assets/icon/02a.png'),
                require('./assets/icon/03a.png'),
                require('./assets/icon/04a.png'),
                require('./assets/icon/05a.png'),
                require('./assets/icon/06a.png'),
                require('./assets/icon/07a.png'),
                require('./assets/icon/08a.png'),
                require('./assets/icon/09a.png'),
                require('./assets/icon/10a.png'),
                require('./assets/icon/11a.png'),
                require('./assets/icon/12a.png'),
                require('./assets/icon/13a.png'),
                require('./assets/icon/14a.png'),
                require('./assets/icon/15a.png'),
                require('./assets/icon/16a.png'),
                require('./assets/icon/17a.png'),
                require('./assets/icon/18a.png'),
                require('./assets/icon/19a.png'),
                require('./assets/icon/20a.png'),
                require('./assets/icon/21a.png'),
                require('./assets/icon/22a.png'),
                require('./assets/icon/23a.png'),
                require('./assets/icon/24a.png'),
                require('./assets/icon/25a.png'),
                require('./assets/icon/26a.png'),
                require('./assets/icon/27a.png'),
                require('./assets/icon/28a.png'),
                require('./assets/icon/29a.png'),
                require('./assets/icon/30a.png'),
                require('./assets/icon/31a.png'),
                require('./assets/icon/32a.png'),
                require('./assets/icon/33a.png'),
                require('./assets/icon/34a.png'),
                require('./assets/icon/35a.png'),
               


                require('./assets/icon/01n.png'),
                require('./assets/icon/02n.png'),
                require('./assets/icon/03n.png'),
                require('./assets/icon/04n.png'),
                require('./assets/icon/05n.png'),
                require('./assets/icon/06n.png'),
                require('./assets/icon/07n.png'),
                require('./assets/icon/08n.png'),
                require('./assets/icon/09n.png'),
                require('./assets/icon/10n.png'),
                require('./assets/icon/11n.png'),
                require('./assets/icon/12n.png'),
                require('./assets/icon/13n.png'),
                require('./assets/icon/14n.png'),
                require('./assets/icon/15n.png'),
                require('./assets/icon/16n.png'),
                require('./assets/icon/17n.png'),
                require('./assets/icon/18n.png'),
                require('./assets/icon/19n.png'),
                require('./assets/icon/20n.png'),
                require('./assets/icon/21n.png'),
                require('./assets/icon/22n.png'),
                require('./assets/icon/23n.png'),
                require('./assets/icon/24n.png'),
                require('./assets/icon/25n.png'),
                require('./assets/icon/26n.png'),
                require('./assets/icon/27n.png'),
                require('./assets/icon/28n.png'),
    
    
                require('./assets/bg/01b.jpg'),
                require('./assets/bg/02b.jpg'),
                require('./assets/bg/03b.jpg'),
                require('./assets/bg/04b.jpg'),
                require('./assets/bg/05b.jpg'),
                require('./assets/bg/06b.jpg'),
                require('./assets/bg/07b.jpg'),
                require('./assets/bg/08b.jpg'),
                require('./assets/bg/09b.jpg'),
                require('./assets/bg/10b.jpg'),
                require('./assets/bg/11b.jpg'),
                require('./assets/bg/12b.jpg'),
                require('./assets/bg/13b.jpg'),
                require('./assets/bg/14b.jpg'),
                require('./assets/bg/15b.jpg'),
                require('./assets/bg/16b.jpg'),
                require('./assets/bg/17b.jpg'),
                require('./assets/bg/18b.jpg'),
                require('./assets/bg/19b.jpg'),
                require('./assets/bg/20b.jpg'),
                require('./assets/bg/21b.jpg'),
                require('./assets/bg/22b.jpg'),
                require('./assets/bg/23b.jpg'),
                require('./assets/bg/24b.jpg'),
                require('./assets/bg/25b.jpg'),
                require('./assets/bg/26b.jpg'),
                require('./assets/bg/27b.jpg'),
                require('./assets/bg/28b.jpg'),
                require('./assets/bg/29b.jpg'),
                require('./assets/bg/30b.jpg'),
                require('./assets/bg/31b.jpg'),
                require('./assets/bg/32b.jpg'),
                require('./assets/bg/33b.jpg'),
                require('./assets/bg/34b.jpg'),
                require('./assets/bg/35b.jpg'),
                require('./assets/cardimg/01c.jpg'),
    
    
    
    
    
    
                require('./assets/cardimg/02c.jpg'),
                require('./assets/cardimg/03c.jpg'),
                require('./assets/cardimg/04c.jpg'),
                require('./assets/cardimg/05c.jpg'),
                require('./assets/cardimg/06c.jpg'),
                require('./assets/cardimg/07c.jpg'),
                require('./assets/cardimg/08c.jpg'),
                require('./assets/cardimg/09c.jpg'),
                require('./assets/cardimg/10c.jpg'),
                require('./assets/cardimg/11c.jpg'),
                require('./assets/cardimg/12c.jpg'),
                require('./assets/cardimg/13c.jpg'),
                require('./assets/cardimg/14c.jpg'),
                require('./assets/cardimg/15c.jpg'),
                require('./assets/cardimg/16c.jpg'),
                require('./assets/cardimg/17c.jpg'),
                require('./assets/cardimg/18c.jpg'),
                require('./assets/cardimg/19c.jpg'),
                require('./assets/cardimg/20c.jpg'),
                require('./assets/cardimg/21c.jpg'),
                require('./assets/cardimg/22c.jpg'),
                require('./assets/cardimg/23c.jpg'),
                require('./assets/cardimg/24c.jpg'),
                require('./assets/cardimg/25c.jpg'),
                require('./assets/cardimg/26c.jpg'),
                require('./assets/cardimg/27c.jpg'),
                require('./assets/cardimg/28c.jpg'),
                require('./assets/cardimg/29c.jpg'),
                require('./assets/cardimg/30c.jpg'),
                require('./assets/cardimg/31c.jpg'),
                require('./assets/cardimg/32c.jpg'),
                require('./assets/cardimg/33c.jpg'),
                require('./assets/cardimg/34c.jpg'),
                require('./assets/cardimg/35c.jpg'),


                require('./assets/Sqs.gif')
              ]),
              await Font.loadAsync({
                'open-bold' : require('./assets/font/trebucbd.ttf'),
                 'open-regular' : require('./assets/font/trebuc.ttf'),
                 'circe-ebold' : require('./assets/font/Circe-ExtraBold.ttf'),
                 'sf-regular' : require('./assets/font/SFUIDisplay-Regular.ttf'),
                 'sf-light' : require('./assets/font/SFUIDisplay-Light.ttf'),
                 'sf-semiB' : require('./assets/font/SFUIDisplay-Semibold.ttf'),
                 'prosto-regular' : require('./assets/font/ProstoOne-Regular.ttf'),
                 'gilory-ebold' : require('./assets/font/Gilroy-ExtraBold.otf'),
                 'circe-regular' : require('./assets/font/Circe-Regular.ttf'),
                 'sfUi-heavy' : require('./assets/font/SFUIDisplay-Heavy.ttf'),
                 'gilory-black' : require('./assets/font/Gilroy-Black.ttf'),
                 'sfUi-bold' : require('./assets/font/SFUIDisplay-Bold.ttf'),
                 'sfUi-black' : require('./assets/font/SFUIDisplay-Black.ttf'),
                 'gilory-heavy' : require('./assets/font/Gilroy-Heavy.ttf'),
    
                 
             })
         
        ])
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
       setIsReady(true);
      }
    }

    prepare();
  }, []);



  useEffect(()=>{
    async function deletSplash(){
        await SplashScreen.hideAsync();
    }
      
    if (isReady) {
     
        deletSplash()
      }

},[isReady])

//Перезапись даты
//   const mediaRef = firebase.database().ref('mediaData')


//   mediaRef.set(TICHER) 
//   .then(() => {
//       setLoadLoginModal(false)
//   //    console.log("Готово", uid)
//   })
//   .catch((error) => {
//       setLoadLoginModal(false)
//       // console.log('ошибка записи в БД', error)
//       goAlert("Незаписалось")
//   });

// check duble name

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const sDisp = () => {

  if(windowHeight < 620){
    return true
  }else{
    return false
  }
  
}

useEffect(()=>{
    if( email.length > 6 && email.includes('@') && promoState.length > 7 && password.length > 5 && confirmPassword.length > 5
        ){
            ifadeIn()
            setRegisterButton(true)
        }
        else{
            ifadeOut()  
            setRegisterButton(false)
        }

        if( email.length > 6 && email.includes('@') && password.length > 5
        ){
            ifadeIn2()
            setLoginButton(true)
        }
        else{
            ifadeOut2()  
            setLoginButton(false)
        }
 

},[email,promoState,password,confirmPassword])

// firebase.auth().signOut()

// const chekRegButtonStatus = () => {
       
//     if( email.length > 6 && email.includes('@') && promoState.length > 7 && password.length > 5 && confirmPassword.length > 5
//         ){
//             ifadeIn()
//             console.log('тру')
//         }
//         else{
//             ifadeOut()  
//             console.log('фалс')
//         }
         
//  }

// useEffect(()=>{

//     let queryName = firebase.database().ref("users")

//     queryName.once("value")

// .then(function(snapshot) {
//  var array = snapshot.val()
//  for (var i in array){
//      let value = array[i]
//     //  console.log(value.fullName);
//      if(value.fullName === fullName ){
//          setFullNameDuble(true)
//          console.log('хопа')
//          break
//      }else{
//         setFullNameDuble(false)
//      }
       
//  }
// })
// },[fullName])


useEffect(()=>{

    setDeletePromo({status: false,key:false})

    if(promoState.toUpperCase() == 'DIMAFOMA'){
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

    // console.log("Длина прилы",firebase.apps.length)
    // console.log('старт')
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            // console.log("Длина прилы",firebase.apps.length)
            // console.log('финиш')
            setIsLogin(true)
        
        } else {
            // console.log("Длина прилы",firebase.apps.length)
            // console.log('финиш')
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

useEffect(()=>{

    
    if(isLogin){
        firebase.auth().signOut()
    }


    // const uid = response.user.uid
    // const usersRef = firebase.database().ref('users')
   
    // usersRef
    //     .child(uid)
    //     .once('value')
    //     .then(userData => {
    //        const dId =  JSON.parse(JSON.stringify(userData))
    //         // console.log('дата при регестрации', userData)
    //         console.log('prvoe', dId.deviceId)

    //         console.log('vtoroe', unicalDeviceId )

    //         if(dId.deviceId === unicalDeviceId){
    //             setLoadLoginModal(false)
    //             console.log('проходите')
    //         }else if (dId.deviceId === undefined){
    //             usersRef.child(uid).child('deviceId').set(unicalDeviceId).then(()=>{

    //                 // setLoadLoginModal(false)
                    
                    
    //                 console.log('записываем id и входим')
    //             })
                
    //         }else{
    //             setuDeviceScreen(true)
    //             console.log('показываем окно предупреждения')
    //             // setLoadLoginModal(false)
    //         }

            
           
        
    //       console.log(userData.child('fullName'))

    //     })
    //     .catch(error => {
    //         // alert('ошибка логина2', )
    //         setLoadLoginModal(false)
    //         alert(error)
    //     });


},[uDeviceScreen])







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
                   const dId =  JSON.parse(JSON.stringify(userData))
                    // console.log('дата при регестрации', userData)
                    console.log('prvoe', dId.deviceId)
                    setCurentLoginId(dId.deviceId)
                    console.log('vtoroe', unicalDeviceId )

                    if(dId.deviceId === unicalDeviceId){
                        setLoadLoginModal(false)
                        console.log('проходите')
                    }else if (dId.deviceId === undefined){
                        usersRef.child(uid).child('deviceId').set(unicalDeviceId).then(()=>{

                            // setLoadLoginModal(false)
                            
                            
                            console.log('записываем id и входим')
                        })
                        
                    }else{
                        setuDeviceScreen(true)
                        console.log('показываем окно предупреждения')
                        // setLoadLoginModal(false)
                    }

                    
                   
                
                  console.log(userData.child('fullName'))

                })
                .catch(error => {
                    // alert('ошибка логина2', )
                    setLoadLoginModal(false)
                    alert(error)
                });
        })
        .catch(error => {
            if(error.code == 'auth/invalid-email'){
                goAlert('Введите корректную почту.')
            }
            if(error.code == 'auth/user-disabled'){
                goAlert('Пользователь отключен.')
            }
            if(error.code == 'auth/user-not-found'){
                goAlert('Неверно введена почта или пароль.')
            }
            if(error.code == 'auth/wrong-password'){
                goAlert('Неверно введена почта или пароль.')
            }
            setLoadLoginModal(false)
     
            
           
        })
}


async function wrapsRegister(params) {

    // if(fullName.length <= 1){
    //     setLoadLoginModal(false)
    //     goAlert('Введите имя (минимально два символа)')
    //    return
    // }

    
    // if (fullNameDuble) {

    //     setLoadLoginModal(false)
    //     goAlert("Имя занято")
    
    // } else {
    

    if (password !== confirmPassword) {
        setLoadLoginModal(false)
        goAlert("Пароли не совпадают")
  
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
                point:0,
                deviceId: unicalDeviceId
            };

            const usersRef = firebase.database().ref('users')

            const usersRefData = firebase.database().ref('usersData')
         
            usersRefData.child(uid).set(USERDATA).then(() => {
              
       

            }).catch((error) => {
                goAlert("Ошибка соединения")

            })
            usersRef
                .child(uid)
                .set(data)
                .then(() => {
                    setLoadLoginModal(false)
                //    console.log("Готово", uid)
                })
                .catch((error) => {
                    setLoadLoginModal(false)
                    // console.log('ошибка записи в БД', error)
                    goAlert("Ошибка соединения")
                });
        })
        .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                setLoadLoginModal(false)
            goAlert('Введите более надёжный пароль (минимум 6 символов)')
          
            }else if (errorCode == 'auth/email-already-in-use') {
                setLoadLoginModal(false)
             goAlert('Пользователь с данным email уже зарегистрирован')
              }
              else if (errorCode == 'auth/invalid-email') {

                setLoadLoginModal(false)
                goAlert('Недействительный адрес электронной почты')
           

              }
              else if (errorCode == 'auth/operation-not-allowed') {
                setLoadLoginModal(false)
                goAlert('Недействительный адрес электронной почты')
              }
             else {
                setLoadLoginModal(false)
                goAlert(errorMessage)
            
            }
            setLoadLoginModal(false)
    
    });

// }
}
    
  async function onRegisterPress () {

    const chekZeroSimbol = (string) => {

        const arr = string.trim().split('')

        if(arr.includes(" ")){

            return true

        }else{

            return false

        }
        

    }



    setLoadLoginModal(true)

    if(chekZeroSimbol(promoState)){
        setLoadLoginModal(false)
        goAlert('Код доступа не должен содержать пробелы')
       return
    }
    if(chekZeroSimbol(email)){
        setLoadLoginModal(false)
        goAlert('Е-мэйл не должен содержать пробелы')
       return
    }

    if(chekZeroSimbol(password)){
        setLoadLoginModal(false)
        goAlert('Пароль не должен содержать пробелы')
       return
    }
    if(chekZeroSimbol(confirmPassword)){
        setLoadLoginModal(false)
        goAlert('Пароль не должен содержать пробелы')
       return
    }
    if(promoState < 8){

       
        setLoadLoginModal(false)
        goAlert('Код доступа должен быть 8 символов')
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
                    goAlert('Код доступа недествителен')
             
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

                    wrapsRegister() 
                    
                }
            )
        }
        }else{

            setLoadLoginModal(false)

            goAlert('Введите корректный код доступа')

             return

          }
        
    
    }







}

// подключение шрифтов


// async function bootstrap (){
//     await Promise.all([
//         await Asset.loadAsync([

//             require('./assets/img/BG.jpg'),
//             require('./assets/img/BG.png'),
//             require('./assets/img/logo.png'),
//             require('./assets/img/hLogo.png'),
//             require('./assets/img/word_img_1.png'),
//             require('./assets/img/word_img_2.png'),
//             require('./assets/img/word_img_3.png'),
//             require('./assets/img/block.png'),
//             require('./assets/img/phrase_img_1.jpg'),
//             require('./assets/img/phrase_img_2.jpg'),
//             require('./assets/img/phrase_img_3.jpg'),
//             require('./assets/img/close.png'),
//             require('./assets/img/word_test.jpg'),
//             require('./assets/img/finalwordbg.jpg'),
//             require('./assets/img/test_dialog_bg_img.png'),
//             require('./assets/img/sound.png'),
//             require('./assets/img/star_5.png'),
//             require('./assets/img/star_6.png'),
//             require('./assets/img/star_1.png'),
//             require('./assets/img/star_2.png'),
//             require('./assets/img/star_3.png'),
//             require('./assets/img/star_4.png'),
//             require('./assets/img/repat1.png'),
//            require('./assets/img/repat2.png'), 
//             require('./assets/img/heart1.png'),
//             require('./assets/img/heart2.png'),
//             require('./assets/img/profile.png'),

//             require('./assets/icon/01a.png'),
//             require('./assets/icon/02a.png'),
//             require('./assets/icon/03a.png'),
//             require('./assets/icon/04a.png'),
//             require('./assets/icon/05a.png'),
//             require('./assets/icon/06a.png'),
//             require('./assets/icon/07a.png'),
//             require('./assets/icon/08a.png'),
//             require('./assets/icon/09a.png'),
//             require('./assets/icon/10a.png'),
//             require('./assets/icon/11a.png'),
//             require('./assets/icon/12a.png'),
//             require('./assets/icon/13a.png'),
//             require('./assets/icon/14a.png'),
//             require('./assets/icon/15a.png'),
//             require('./assets/icon/16a.png'),
//             require('./assets/icon/17a.png'),
//             require('./assets/icon/18a.png'),
//             require('./assets/icon/19a.png'),
//             require('./assets/icon/20a.png'),
//             require('./assets/icon/21a.png'),
//             require('./assets/icon/22a.png'),
//             require('./assets/icon/23a.png'),
//             require('./assets/icon/24a.png'),
//             require('./assets/icon/25a.png'),
//             require('./assets/icon/26a.png'),
//             require('./assets/icon/27a.png'),
//             require('./assets/icon/28a.png'),
//             require('./assets/icon/29a.png'),
//             require('./assets/icon/30a.png'),
//             require('./assets/icon/31a.png'),
//             require('./assets/icon/32a.png'),
//             require('./assets/icon/33a.png'),
//             require('./assets/icon/34a.png'),
//             require('./assets/icon/35a.png'),

//             require('./assets/bg/01b.jpg'),
//             require('./assets/bg/02b.jpg'),
//             require('./assets/bg/03b.jpg'),
//             require('./assets/bg/04b.jpg'),
//             require('./assets/bg/05b.jpg'),
//             require('./assets/bg/06b.jpg'),
//             require('./assets/bg/07b.jpg'),
//             require('./assets/bg/08b.jpg'),
//             require('./assets/bg/09b.jpg'),
//             require('./assets/bg/10b.jpg'),
//             require('./assets/bg/11b.jpg'),
//             require('./assets/bg/12b.jpg'),
//             require('./assets/bg/13b.jpg'),
//             require('./assets/bg/14b.jpg'),
//             require('./assets/bg/15b.jpg'),
//             require('./assets/bg/16b.jpg'),
//             require('./assets/bg/17b.jpg'),
//             require('./assets/bg/18b.jpg'),
//             require('./assets/bg/19b.jpg'),
//             require('./assets/bg/20b.jpg'),
//             require('./assets/bg/21b.jpg'),
//             require('./assets/bg/22b.jpg'),
//             require('./assets/bg/23b.jpg'),
//             require('./assets/bg/24b.jpg'),
//             require('./assets/bg/25b.jpg'),
//             require('./assets/bg/26b.jpg'),
//             require('./assets/bg/27b.jpg'),
//             require('./assets/bg/28b.jpg'),
//             require('./assets/bg/29b.jpg'),
//             require('./assets/bg/30b.jpg'),
//             require('./assets/bg/31b.jpg'),
//             require('./assets/bg/32b.jpg'),
//             require('./assets/bg/33b.jpg'),
//             require('./assets/bg/34b.jpg'),
//             require('./assets/bg/35b.jpg'),
//             require('./assets/cardimg/01c.jpg'),






//             require('./assets/cardimg/02c.jpg'),
//             require('./assets/cardimg/03c.jpg'),
//             require('./assets/cardimg/04c.jpg'),
//             require('./assets/cardimg/05c.jpg'),
//             require('./assets/cardimg/06c.jpg'),
//             require('./assets/cardimg/07c.jpg'),
//             require('./assets/cardimg/08c.jpg'),
//             require('./assets/cardimg/09c.jpg'),
//             require('./assets/cardimg/10c.jpg'),
//             require('./assets/cardimg/11c.jpg'),
//             require('./assets/cardimg/12c.jpg'),
//             require('./assets/cardimg/13c.jpg'),
//             require('./assets/cardimg/14c.jpg'),
//             require('./assets/cardimg/15c.jpg'),
//             require('./assets/cardimg/16c.jpg'),
//             require('./assets/cardimg/17c.jpg'),
//             require('./assets/cardimg/18c.jpg'),
//             require('./assets/cardimg/19c.jpg'),
//             require('./assets/cardimg/20c.jpg'),
//             require('./assets/cardimg/21c.jpg'),
//             require('./assets/cardimg/22c.jpg'),
//             require('./assets/cardimg/23c.jpg'),
//             require('./assets/cardimg/24c.jpg'),
//             require('./assets/cardimg/25c.jpg'),
//             require('./assets/cardimg/26c.jpg'),
//             require('./assets/cardimg/27c.jpg'),
//             require('./assets/cardimg/28c.jpg'),
//             require('./assets/cardimg/29c.jpg'),
//             require('./assets/cardimg/30c.jpg'),
//             require('./assets/cardimg/31c.jpg'),
//             require('./assets/cardimg/32c.jpg'),
//             require('./assets/cardimg/33c.jpg'),
//             require('./assets/cardimg/34c.jpg'),
//             require('./assets/cardimg/35c.jpg'),
//           ]),
//           await Font.loadAsync({
//             'open-bold' : require('./assets/font/trebucbd.ttf'),
//              'open-regular' : require('./assets/font/trebuc.ttf'),
//              'circe-ebold' : require('./assets/font/Circe-ExtraBold.ttf'),
//              'sf-regular' : require('./assets/font/SFUIDisplay-Regular.ttf'),
//              'sf-light' : require('./assets/font/SFUIDisplay-Light.ttf'),
//              'sf-semiB' : require('./assets/font/SFUIDisplay-Semibold.ttf'),
//              'prosto-regular' : require('./assets/font/ProstoOne-Regular.ttf'),
//              'gilory-ebold' : require('./assets/font/Gilroy-ExtraBold.otf'),
//              'circe-regular' : require('./assets/font/Circe-Regular.ttf'),
//              'sfUi-heavy' : require('./assets/font/SFUIDisplay-Heavy.ttf'),
//              'gilory-black' : require('./assets/font/Gilroy-Black.ttf'),
//              'sfUi-bold' : require('./assets/font/SFUIDisplay-Bold.ttf'),
//              'sfUi-black' : require('./assets/font/SFUIDisplay-Black.ttf'),
//              'gilory-heavy' : require('./assets/font/Gilroy-Heavy.ttf'),


//          })
     
//     ])

// }

// проверка интернета событие
useEffect(() => {
    NetInfo.addEventListener(state => {

        if(state.isInternetReachable){
            setInterConect(true)
        }else{
            setInterConect(false)
        }
        console.log('Connection type', state.isInternetReachable);
      });
  },[]);

// проверка интернета 
const checkInternet = () => {
    NetInfo.addEventListener(state => {

        if(state.isInternetReachable){
            setInterConect(true)
        }else{
            setInterConect(false)
        }
        console.log('Connection type', state.isInternetReachable);
      });
}
// interConect

// !isReady || isLogin === undefined
    
if(!isReady || isLogin === undefined){
      
    return (

        <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#fff' }}
        >
            {/* <Text>gjikb yf wwwwwww</Text> */}
            <Image style={{width: '100%',height: '100%',resizeMode: 'cover'}} source={require('./assets/Sqs.gif')}></Image>
       
      </View>

    //   <AppLoading

    //   style={{backgroundColor: THEME.AKCENT_COLOR ,width: '100%',height: '100%'}}

    //   startAsync = {bootstrap}

    //   onFinish = {() => setIsReady(true)}

    //   onError = {err => console.log(err)}  />

    )   

  }else{


// interConect
if(interConect){
    // isLogin
    if(uDeviceScreen){

        return (
    
    
            <ImageBackground source={require('./assets/img/BG.jpg')} style={styles.rbacgroundImage}>
                
                <View style={styles.aWhiteBlock}>
    
                </View>
            
                <TouchableOpacity activeOpacity={1} style={{width: '100%', height: '100%'}} onPress={()=>{
    
                             firebase.auth().signOut().then(()=>{
                    setuDeviceScreen(false)
                  }
                  )
               
                }}>
    
             
    
            <View style={{...styles.rBgWhite,justifyContent: 'center'}}>
      
            <TouchableOpacity  activeOpacity={1}>
            {/* <View style={{     
           flexDirection: 'column',
           alignItems: 'center',
           justifyContent: 'center',
           backgroundColor: 'rgba(79, 81, 140, 1.0)',
           width: 40,
           height: 40}}> 
    <Text>fff</Text>
                </View> */}
            <View style={styles.aContentWraper}>
      
            <Image  style={styles.aLogoImage}
            source={require('./assets/img/atention.png')}>
            </Image>
    
            <Text style={styles.aBigText} >выполнен вход с другого устройства</Text>
    
            <Text style={styles.aSmalText}>выйдите из приложения вручную</Text>
    
            <Text style={{...styles.aSmalText,marginTop: 0}}>или</Text>
    
            <Text style={{...styles.aSmalText,marginTop: 0}}>обратитесь в техническую поддержку</Text>
    
    
            <TouchableOpacity onPress={()=>{
                if(isLogin){
                    firebase.auth().signOut().then(()=>{
                        setuDeviceScreen(false)
                      }
        
        
                      )
                }else{
                    setuDeviceScreen(false)
                }
           
          
            }}>
    
                <Text style={styles.aButton}>
                    понятно
                </Text>
    
            </TouchableOpacity>
    
            </View>
    
            </TouchableOpacity>
            
       </View>
    
    
    
       </TouchableOpacity>
          </ImageBackground>
    
    
    
    
            
    //   <View style={{flex: 1}}>
    //       <View style={{flex: 0.5}}>
    //       <Text>
    //           Разлогиньтесь на другом устройстве
    //           </Text>
    //           <TouchableOpacity onPress={()=>{
    //               firebase.auth().signOut().then(()=>{
    //                 setuDeviceScreen(false)
    //               }
    //               )
    //           }}>
    //               <Text>
    //                   ОК
    //               </Text>
    //           </TouchableOpacity>
    //       </View>
         
    
    //   </View>
    
    
    
              )  
      
    
    }



else if(isLogin){

    // uDeviceScreen

    return (
        <Provider store={store}>
        <AppNavigation /> 
        </Provider>
          )  

  


}else{

  if(loginNav === 'buttons'){
    
  return (
      <ImageBackground source={require('./assets/img/BG.jpg')} style={styles.rbacgroundImage}>



<View style={styles.rBgWhiteDirect}>
    
    <View style={styles.rLogoWraper}>
        <Image  style={styles.rLogoImage}
        source={require('./assets/img/logo.png')}>

        </Image>
    </View>

    <View style={styles.rButtonsWraper}>

        <TouchableOpacity style={styles.rButton}  onPress={() =>  setLoginNav('login')}>
            <Text style={styles.rButtonText}>ВХОД</Text>
        </TouchableOpacity>
            <Text style={{...styles.rSpanButon, paddingVertical: 20}}>или</Text>
            <TouchableOpacity style={styles.rButton}  onPress={() =>  setLoginNav('reg')} >
            <Text style={styles.rButtonText}>РЕГИСТРАЦИЯ</Text>
        </TouchableOpacity>
        <Text style={{...styles.rSpanButon, paddingTop: 10}}>необходим код активации</Text>
        <Text style={{...styles.rSpanButon}}>super инглиш</Text>
              
    </View>

    <View style={styles.rBottomWraper}>
        <Text style={styles.rBottomText}>техническая поддержка</Text>

        <TouchableOpacity onPress={() => Linking.openURL('http://google.com')}>
        <Text style={styles.rBottomSubText}>support@superenglish.online</Text>

        </TouchableOpacity>
       <View style={styles.rIconWraper}> 

            <TouchableOpacity  onPress={() => Linking.openURL('http://google.com')} >
           
           
            <FontAwesome5 name="telegram-plane" size={30} color="#a0a0a0" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => Linking.openURL('http://google.com')} >
            <FontAwesome5 name="whatsapp" size={30} color="#a0a0a0" />
            </TouchableOpacity>

        </View>
          
        </View>
    
   </View>

      </ImageBackground>
//  <View style={styles.directContainerFirst}>
//     <View style={styles.container}>
         
//                 <TouchableOpacity
//                     style={styles.tButton}
//                     onPress={() =>  setLoginNav('login')}>
//                              <LinearGradient
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                 colors={['#D988D6', '#EF9FCA', '#FFB3BF']}
//                 style={{...styles.button, height: sDisp() ? 42 : 54  }}
//                 >
//                     <Text style={{...styles.buttonTitle,fontSize: 14}}>Войти</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                  style={styles.tButton}
//                     onPress={() =>  setLoginNav('reg')}>
//                          <LinearGradient
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                 colors={['#D988D6', '#EF9FCA', '#FFB3BF']}
//                 style={{...styles.button, height: sDisp() ? 42 : 54  }}
//                 >
//                     <Text style={{...styles.buttonTitle,fontSize: 14}}>Регистрация</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>

//     </View>
//     </View>
  
  )

  }
 
  if(loginNav === 'reg'){
   

   

        return (
            <KeyboardAwareScrollView   contentContainerStyle={{ height: windowHeight}}    keyboardShouldPersistTaps="always"  >
            <ImageBackground source={require('./assets/img/BG.jpg')} style={styles.rbacgroundImage}>


            <View style={{...styles.rBgWhiteDirect, justifyContent: 'flex-start'}}>
                
                <View style={styles.rLogoWraper}>
                    <Image  style={styles.rLogoImage}
                    source={require('./assets/img/logo.png')}>
            
                    </Image>
                </View>
            
              
            
                <View style={styles.rInputWraper} >
            <TextInput
                         style = {{...styles.rInput, marginTop: 0, fontSize: 13, paddingTop: 20 }}
                         placeholder = 'КОД ДОСТУПА SUPER ИНГЛИШ'
                         placeholderTextColor = "#a0a0a0"
                         onChangeText = {(text) => {
                             setPromoState(text)
                            
                            }}
                         value = {promoState}
                         underlineColorAndroid = "transparent"
                         autoCapitalize = "none"
                   
                     />
                      <TextInput
                         style = {styles.rInput}
                         placeholder = 'ваша почта'
                         placeholderTextColor = "#a0a0a0"
                         onChangeText={(text) => {
                             setEmail(text)
                             
                        }}
                          value={email}
                         underlineColorAndroid = "transparent"
                         autoCapitalize = "none"
                     />
                    <TextInput
                         style = {styles.rInput}
                         placeholder = 'пароль'
                         placeholderTextColor = "#a0a0a0"
                        onChangeText={(text) => 
                            setPassword(text)
                          }
                         value={password}
                         underlineColorAndroid = "transparent"
                         autoCapitalize = "none"
                         
                     />
                         <TextInput
                         style = {styles.rInput}
                         placeholder = 'пароль ещё раз'
                         placeholderTextColor = "#a0a0a0"
                        onChangeText={(text) => 
                            setConfirmPassword(text)
                        }
                         value={confirmPassword}
                         underlineColorAndroid = "transparent"
                         autoCapitalize = "none"
                         
                     />
<Animated.View style={{width: '100%', opacity: interpreterVision.fadeAnimation}}>


<TouchableOpacity  disabled={!registerButton} style={{...styles.rButton, marginTop: 35
}}   onPress={() => onRegisterPress()} >
            <Text style={styles.rButtonText}>РЕГИСТРАЦИЯ</Text>
        </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity>
            <Text style={styles.exitButton}  onPress={() =>  setLoginNav('buttons')} >
                назад
            </Text>
        </TouchableOpacity>
                    </View>
                
               </View>
            
                  </ImageBackground>

                  </KeyboardAwareScrollView>
                  
            // <ImageBackground source={require('./assets/img/BG.jpg')} style={styles.rbacgroundImage}>


            // <View style={styles.rBgWhite}>
                
            //     <View style={styles.rLogoWraper}>
            //         <Image  style={styles.rLogoImage}
            //         source={require('./assets/img/logo.png')}>
            
            //         </Image>
            //     </View>
            
            //     <View style={styles.rButtonsWraper}>
            
            //         <TouchableOpacity style={styles.rButton}  onPress={() =>  setLoginNav('login')}>
            //             <Text style={styles.rButtonText}>ВХОД</Text>
            //         </TouchableOpacity>
            //             <Text style={{...styles.rSpanButon, paddingVertical: 20}}>или</Text>
            //             <TouchableOpacity style={styles.rButton}  onPress={() =>  setLoginNav('reg')} >
            //             <Text style={styles.rButtonText}>РЕГИСТРАЦИЯ</Text>
            //         </TouchableOpacity>
            //         <Text style={{...styles.rSpanButon, paddingTop: 10}}>необходим код активации</Text>
            //         <Text style={{...styles.rSpanButon}}>super инглиш</Text>
                          
            //     </View>
            
            //     <View style={styles.rBottomWraper}>
            //         <Text style={styles.rBottomText}>Техническа поддержка</Text>
            
            //         <TouchableOpacity onPress={() => Linking.openURL('http://google.com')}>
            //         <Text style={styles.rBottomSubText}>support@superenglish.online</Text>
            
            //         </TouchableOpacity>
                  
            //         </View>
                
            //    </View>
            
            //       </ImageBackground>



// <KeyboardAwareScrollView   contentContainerStyle={{ height: windowHeight}}    keyboardShouldPersistTaps="always"  >


// <View style={styles.containerReg}>





//   <Text style={{...styles.titleReg, fontSize: sDisp() ? 32 : 42}}>Регистрация</Text>





// <View
//     style={{ width: '100%' }}>

        
//                     <TextInput
//                          style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//                          placeholder='Код доступа'
//                          placeholderTextColor="#aaaaaa"
//                          onChangeText={(text) => setPromoState(text)}
//                          value={promoState}
//                          underlineColorAndroid="transparent"
//                          autoCapitalize="none"
//                      />
//                      <TextInput
//                          style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//                          placeholder='Никнэйм'
//                          placeholderTextColor="#aaaaaa"
//                          onChangeText={(text) => setFullName(text)}
//                          value={fullName}
//                          underlineColorAndroid="transparent"
//                          autoCapitalize="none"
//                      />
//                      <TextInput
//                          style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//                          placeholder='Почта'
//                          placeholderTextColor="#aaaaaa"
//                          onChangeText={(text) => setEmail(text)}
//                          value={email}
//                          underlineColorAndroid="transparent"
//                          autoCapitalize="none"
//                      />
//                      <TextInput
//                          style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//                          placeholderTextColor="#aaaaaa"
//                          secureTextEntry
//                          placeholder='Пароль'
//                          onChangeText={(text) => setPassword(text)}
//                          value={password}
//                          underlineColorAndroid="transparent"
//                          autoCapitalize="none"
//                      />
//                      <TextInput
//                          style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//                          placeholderTextColor="#aaaaaa"
//                          secureTextEntry
//                          placeholder='Подтвердить пароль'
//                          onChangeText={(text) => setConfirmPassword(text)}
//                          value={confirmPassword}
//                          underlineColorAndroid="transparent"
//                          autoCapitalize="none"
//                      />
// </View>







// <View style={styles.container}>
   
//    <TouchableOpacity
//        style={styles.tButton}
//        onPress={() => onRegisterPress()}>
//                 <LinearGradient
//        start={{ x: 0, y: 0 }}
//        end={{ x: 1, y: 1 }}
//    colors={['#D988D6', '#EF9FCA', '#FFB3BF']}
//    style={{...styles.button, height: sDisp() ? 42 : 54  }}
//    >
//        <Text style={{...styles.buttonTitle,fontSize: 14}}>Регистрация</Text>
//        </LinearGradient>

//    </TouchableOpacity>


//    <TouchableOpacity
//     style={styles.tButtonP}
//     activeOpacity={1}
//     onPress={() => { setLoginNav('buttons')
//     setEmail('')
//     setPassword('')
// }}>
// <View style={{...styles.buttonPrev,height: sDisp() ? 42 : 54 }}>
//     <Ionicons
//         name={"ios-close"}
//         size={ sDisp() ? 40 : 50} color="#796CFF" 
//         />
//     </View>

// </TouchableOpacity>


// </View>








//              <Modal
//                  animationType='fade' visible={loadLoginModal} transparent={true} 
//                  >
//      <View style={styles.loadingContainer}>
     
//      <ActivityIndicator size="large" color="#000"  />   
//      </View>
//                  </Modal>
      
// </View>
// </KeyboardAwareScrollView>



         )

    
   

  }
  if(loginNav === 'login'){
    return (

        <KeyboardAwareScrollView   contentContainerStyle={{ height: windowHeight}}    keyboardShouldPersistTaps="always"  >
        <ImageBackground source={require('./assets/img/BG.jpg')} style={styles.rbacgroundImage}>
        {/* <View style={styles.aWhiteBlock}>

</View> */}

        <View style={{...styles.rBgWhiteDirect, justifyContent: 'flex-start'}}>
            
            <View style={styles.rLogoWraper}>
                <Image  style={styles.rLogoImage}
                source={require('./assets/img/logo.png')}>
        
                </Image>
            </View>
    
          
        
            <View style={styles.rInputWraper} >
        <TextInput
                     style = {{...styles.rInput,paddingTop: 20 }}
                     placeholder = 'введите вашу почту'
                     placeholderTextColor = "#a0a0a0"
                     onChangeText={(text) => setEmail(text)}
                     value={email}

                     underlineColorAndroid = "transparent"
                     autoCapitalize = "none"
               
                 />
                  <TextInput
                     style = {styles.rInput}
                     placeholder = 'пароль'
                     placeholderTextColor = "#a0a0a0"
                     onChangeText={(text) => setPassword(text)}
                     secureTextEntryаd
                     value={password}
                     underlineColorAndroid = "transparent"
                     autoCapitalize = "none"
                 />
               
               <Animated.View style={{width: '100%', opacity: interpreterVision2.fadeAnimation}}>
<TouchableOpacity disabled={!loginButton}  style={{...styles.rButton, marginTop: 35}}   onPress={() => onLoginPress()} >
        <Text style={styles.rButtonText}>ПРОДОЛЖИТЬ</Text>
    </TouchableOpacity>
</Animated.View>
    <TouchableOpacity>
        <Text style={styles.exitButton}  onPress={() =>  setLoginNav('buttons')} >
            назад
        </Text>
    </TouchableOpacity>
                </View>
            
           </View>
        
              </ImageBackground>

              </KeyboardAwareScrollView>

// <KeyboardAwareScrollView   contentContainerStyle={{ height: windowHeight}}    keyboardShouldPersistTaps="always"  >


//       <View style={styles.containerReg}>





//         <Text style={{...styles.titleReg, fontSize: sDisp() ? 32 : 42}}>Вход</Text>





//       <View
//           style={{ width: '100%' }}>
        
//           <TextInput
//               style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//               placeholder='Почта'
//               placeholderTextColor="#A5A5A5"
//               onChangeText={(text) => setEmail(text)}
//               value={email}
//               underlineColorAndroid="transparent"
//               autoCapitalize="none"
//           />
//           <TextInput
//               style={{...styles.input,height: sDisp()? 40 : 54 ,fontSize: sDisp()? 16 : 18}}
//               placeholderTextColor="#A5A5A5"
//               secureTextEntry
//               placeholder='Пароль'
//               onChangeText={(text) => setPassword(text)}
//               value={password}
//               underlineColorAndroid="transparent"
//               autoCapitalize="none"
//           />
//       </View>







//       <View style={styles.container}>
         
//          <TouchableOpacity
//              style={styles.tButton}
//              onPress={() => onLoginPress()}>
//                       <LinearGradient
//              start={{ x: 0, y: 0 }}
//              end={{ x: 1, y: 1 }}
//          colors={['#D988D6', '#EF9FCA', '#FFB3BF']}
//          style={{...styles.button, height: sDisp() ? 42 : 54  }}
//          >
//              <Text style={{...styles.buttonTitle,fontSize: 14}}>Войти</Text>
//              </LinearGradient>

//          </TouchableOpacity>

     
//          <TouchableOpacity
//           style={styles.tButtonP}
//           activeOpacity={1}
//           onPress={() => { setLoginNav('buttons')
//           setEmail('')
//           setPassword('')
// }}>
//     <View style={{...styles.buttonPrev,height: sDisp() ? 42 : 54 }}>
//     <Ionicons
//         name={"ios-close"}
//         size={ sDisp() ? 40 : 50} color="#796CFF" 
//         />
//     </View>

// </TouchableOpacity>
    

// </View>





      


      
//       <Modal
//             animationType='fade' visible={loadLoginModal} transparent={true} 
//             >
// <View style={styles.loadingContainer}>

// <ActivityIndicator size="large" color="#000"  />   
// </View>
//             </Modal>
            
//   </View>
//   </KeyboardAwareScrollView>


    )
  }
}
}else{

    return(



        <ImageBackground source={require('./assets/img/BG.jpg')} style={styles.rbacgroundImage}>
     <View style={styles.aWhiteBlock}>

</View>
<TouchableOpacity activeOpacity={1} style={{width: '100%', height: '100%'}} onPress={()=>{
            checkInternet()
           
            }}>
        <View style={{...styles.rBgWhite,justifyContent: 'center'}}>

        <TouchableOpacity activeOpacity={1} >
        <View style={styles.aContentWraper}>


         
        <Image  style={styles.aLogoImage}
        source={require('./assets/img/atention.png')}>
        </Image>
        <Text style={styles.aBigText} >отсутствует подключение к сети</Text>
        <Text style={styles.aSmalText}>приложение не может обнаружить</Text>
        <Text style={{...styles.aSmalText,marginTop: 0}}>подключение к интернет</Text>

        <TouchableOpacity onPress={()=>{
            checkInternet()
         
        }}>
            <Text style={styles.aButton}>
                ок
            </Text>
        </TouchableOpacity>
       
        </View>
        </TouchableOpacity>

    
   </View>
   </TouchableOpacity>
      </ImageBackground>
    )
}

}
}







const styles = StyleSheet.create({

    rbacgroundImage : {
      flex: 1,
      position: 'relative',
      backgroundColor: '#202124'
    },
    rBgWhite: {
      
        flex: 1,
       
        justifyContent: 'space-between'
    },
    rBgWhiteDirect: {
        backgroundColor: '#ffffff',
        flex: 1,
        opacity: 0.85,
        justifyContent: 'space-between'
    },
  directContainer: {
      paddingTop: 70,
      paddingBottom: 70,
      justifyContent: 'center',  
      height: '100%' ,
  },
  rLogoWraper : {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  rLogoImage: {
      marginTop: 40,
    width: '80%',
    height: 85,

  },
  aWhiteBlock: { flex: 1, opacity: 0.85,  backgroundColor: "#fff",  position: 'absolute',width: '100%',height: '100%'},
  aLogoImage: {
    width: 50,
    height: 50,
    marginTop: 25
  },
  aContentWraper: {
      backgroundColor: '#fff',
    //   flex: 1,
    // backgroundColor:'rgba(255, 255, 255, 1.0)',
    // paddingVertical: 25,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
    // height: '50%'
  },
  
  rButton: {
    backgroundColor: '#e30a18',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%'
  },
  aBigText: {
    fontSize : 20,
    marginTop: 30,
    fontFamily: 'sf-semiB',
    textAlign: 'center'
  },
  aSmalText: {
      color: '#a0a0a0',
      marginTop: 15,
      fontFamily: 'sf-regular'
  },
  aButton: {
      fontSize: 30,
      marginTop: 30,
      color: '#0b1c8c',
      fontFamily: 'sf-regular',
      marginBottom: 25
  },
  rButtonText : {
    color: '#fff',
    fontFamily: 'circe-ebold',
    fontSize: 23,
    letterSpacing: 2
  },
  rSpanButon : {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'sf-regular',
    color: '#a0a0a0',
    fontSize: 16
  },
  rBottomWraper : {
    alignItems: 'center',
    textAlign: 'center', 
    marginBottom: 40
 },
 rBottomText: {
    fontSize: 16,
    color: '#a0a0a0',
    fontFamily: 'sf-regular',
  
    letterSpacing: 1
 },
 rInput: {
    width: '80%',
    borderBottomWidth: 2,
    fontFamily: 'sf-light',
    // textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    borderColor: '#0b1c8c',
    letterSpacing: 2,
    paddingBottom: 8,
    paddingTop: 15
 },
 rInputWraper : {
     width: '100%',
    alignItems: 'center',
   

},
exitButton: {
    fontFamily: 'sf-regular',
    fontSize: 18,
    color: '#0b1c8c',
    paddingTop: 10
},

rIconWraper : {
    flexDirection: 'row',
    marginTop: 5,
    width: 70,
    justifyContent: 'space-between'
},

rBottomSubText: {
    fontFamily: 'sf-semiB',
    fontSize: 15,
    letterSpacing: 0.5
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
    width: '100%',
    alignItems: 'flex-end',
  },
containerReg: {
    
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'flex-end',
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 40,

    // backgroundColor: '#EFEFEF',
   height: '100%'
},

directContainerFirst: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    height: '100%',
},
titleReg: {
    fontSize: 42,
 paddingRight: '10%',
 marginBottom: 20  
},
logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
},
input: {
    height: 54,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
  
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
    marginRight: 30,
    paddingLeft: 16,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    textAlign: "right",
    paddingRight: 16,
    fontSize: 18,
    color: '#A5A5A5'

},
tButton: {
position: "relative",
width: '45%',
borderTopLeftRadius: 40,
borderBottomLeftRadius: 40,
marginTop: 15,
overflow: 'hidden',
backgroundColor: '#34a853'

},
tButtonP: {
    width: '30%'
    },
button: {
    width: '100%',
    backgroundColor: '#788eec',
    height: 54,
    alignItems: "center",
    justifyContent: 'center',
 
},
buttonPrev: {
    width: '100%',
    marginTop: 15,
    height: 54,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  
    paddingLeft: "35%",
    backgroundColor: '#FFFFFF',
    shadowColor: "#DCCAFF",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: 'open-regular'
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
},
loadWraper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: 'center'
},
loadWraperShadow: {
    backgroundColor: '#fff',
    shadowColor: "#DCCAFF",
    shadowOffset: {
    width: 1,
    height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 3.5,
    elevation: 6,
    borderRadius: 20,
    width: '90%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: "column",
 
},
loadText: {
    fontSize: 32,
    textAlign: "center"
},
buttonInternet:{
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: "#3A9FE7",
    borderRadius: 20,
    overflow: 'hidden',
    minWidth: 80
   },

})


