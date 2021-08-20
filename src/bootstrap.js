import * as Font from 'expo-font'

export async function bootstrap (){

await Font.loadAsync({
    'open-bold' : require('../assets/font/TREBUCIT.ttf'),
    'open-regular' : require('../assets/font/TREBUCIT.ttf')
})

}