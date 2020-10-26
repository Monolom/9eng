export async function loadsound (file){
    const status = {
        shouldPlay: false
    }
  const soundObject = await Audio.Sound.createAsync(
        { uri: file },
        { shouldPlay: false }
      )
    
    
    }