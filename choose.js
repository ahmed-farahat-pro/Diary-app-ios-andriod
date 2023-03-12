import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View ,Text, TouchableOpacity, Button} from "react-native";
import { FontFamily, Color } from "./GlobalStyles";
import Voice from '@react-native-voice/voice';
import { useState , useEffect } from 'react';

const choose = ({navigation}) => {
 const route = useRoute()
 const email = route.params.email;

 let [started, setStarted] = useState(false);
 let [rem, setRem] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);
 useEffect(() => {
    checkremeber();
 }, [results]);

const checkremeber = ()=> {
    for(l = 0 ; l<results.length; l++)
    {
        if (results[l] === "remember" || results[l] === "Remember" )
        {
            setRem(true);
            navigation.navigate("PAST",{email : email});
        }
    }
}

  const startSpeechToText = async () => {
    await Voice.start("en-NZ");
    setStarted(true);
  
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
    
  };

  const onSpeechResults = (result) => {
    setResults(result.value);

  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    
    <View style={styles.iphone14Pro2}>
          
        <TouchableOpacity  onPress={()=> navigation.navigate("CAMERA" , {email:email})}  style={styles.videoCameraIcon}>
      <Image
      
        resizeMode="cover"
        source={require("./assets/video-camera.png")}
      />
      </TouchableOpacity>

   
      <TouchableOpacity onPress={()=> navigation.navigate("RECORD" , {email : email})}  style={styles.microphone1Icon}>
      <Image
      
        resizeMode="cover"
        source={require("./assets/microphone-1.png")}
      />
      </TouchableOpacity>
    
        <View style={styles.ss}>
                <TouchableOpacity  onPress= {()=>navigation.navigate("PAST" , {email : email})}style={styles.button}>
                    <Text>past</Text>
                </TouchableOpacity>
                    
      {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => <Text key={index}>{result}</Text>)}
        </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  videoCameraIcon: {
    top: "80%",
    left: "5%",
    width: "30%",
    height: "20%",
    position: "absolute",
    overflow: "hidden",
  },
  microphone1Icon: {
    top: "75%",
    left: "60%",
    width: "30%",
    height: "10%",
    position: "absolute",
  
  },
  
  screenshot20230201At734: {
    top: "5%",
    left: "13%",
    width: "75%",
    height: "27%",
    position: "absolute",
  },
  iphone14Pro2: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
    button: {
    backgroundColor: '#7EC8E3',
    borderRadius: 10,
    justifyContent: 'center',
   height:"100%",
   width:"100%",
    alignItems: 'center',
    marginTop: 40,
      left:"50%"
 
  },
  ss:{
      height: "10%",
    width:"50%",
    zIndex:2,
    top:"40%",
    justifyContent: 'center',
    alignItems:'center',
    alignself:'center'

  }
});

export default choose;
