import * as Font from 'expo-font'

export async function bootstrap (){

await Font.loadAsync({
    'open-bold' : require('../assets/font/Roboto-Bold.ttf'),
    'open-regular' : require('../assets/font/Roboto-Regular.ttf')
})

}