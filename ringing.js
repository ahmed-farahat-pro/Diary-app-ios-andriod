import * as React from "react";
import { Image, StyleSheet, View  , TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "./GlobalStyles";
import { Audio , Sound} from 'expo-av';
import { useState , useEffect } from 'react';
import { useRoute } from "@react-navigation/native";

const ringing = ({navigation}) => {
 const route = useRoute()
 const email = route.params.email;
const ss = require("./assets/ringing.wav")
const as1 = require("./assets/pexelskarolinagrabowska4195324-1.png");
const as2 = require("./assets/ico24communicationcall.png");
const as3 = require("./assets/call.png");
const as4 = require("./assets/screenshot-20230201-at-746-1.png");
const as5 = require("./assets/screenshot-20230201-at-748-1.png");
 const playbackObj = new Audio.Sound();
    
  const playSound = async () => {
 await  playbackObj.loadAsync(ss);
  

   playbackObj.playAsync();


  }
const stopAudio = async () => {
     
       
         try { await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
  } catch (error) {
    console.error(error);
  }
       
    
}
       

    // Your sound has stopped playing!
    useEffect(()=>{
    playSound();
    },[])


    
 

  return (
   
    <View style={styles.iphone14Pro1}>
      <Image
        style={styles.pexelsKarolinaGrabowska4195Icon}
        resizeMode="cover"
        source={as1}
      />
       <TouchableOpacity onPress={()=> { stopAudio();}} style={styles.ico24CommunicationCalIcon}>
      <Image
       
        resizeMode="cover"
        source={as2}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> { stopAudio(); navigation.navigate("CHOOSE" , {email:email})}} style={styles.callIcon}>
      <Image
       
        resizeMode="cover"
        source={as3}
      />
      </TouchableOpacity>
         
      <Image
        style={styles.screenshot20230201At746}
        resizeMode="cover"
        source={as4}
      />
      <Image
        style={styles.screenshot20230201At748}
        resizeMode="cover"
        source={as5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pexelsKarolinaGrabowska4195Icon: {
    top: 0,
    left: 0,
    width: "100%",
    position: "absolute",
    height: "100%",
    zIndex:10,
  },
  ico24CommunicationCalIcon: {
    height: 40,
    width: 40,
    top: "85.62%",
    right: "5.73%",
    bottom: "3.12%",
    left: "83%",
   alignItems:'center',
   justifyContent:'center',
   alignSelf:'center',
    position: "absolute",

    zIndex:20,
  },
  callIcon: {
    top: "85%",
    left: "5%",
    width: 50,
    height: 50,
    position: "absolute",
   alignItems:'center',
    justifyContent:'center',
alignSelf:'center',
    zIndex:20,
  },
  screenshot20230201At746: {
    top: "45%",
    left: "15%",
    width: "45%",
    height: "11%",
    position: "absolute",
    zIndex:10,
  },
  screenshot20230201At748: {
    top: "56%",
    left: "20%",
    width: "50%",
    height: "16%",
    position: "absolute",
    zIndex:10,
  },
  iphone14Pro1: {
    backgroundColor: Color.black,
    flex: 1,
    
    overflow: "hidden",
 
    zIndex:10,
  },
});

export default ringing;
