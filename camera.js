import {StatusBar, statusBar} from 'expo-status-bar';
import React from 'react';
import { useState , useEffect , useRef } from 'react';
import {Button, StyleSheet , Text , View} from 'react-native';
import {Audio} from 'expo-av'
import { Camera} from 'expo-camera'
import { Video} from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from  'expo-media-library'
import { firebaseConfig } from './config/firebase1';
import firebase from "firebase/app";
import {Platform} from 'react-native'
import "firebase/firestore";
import { useRoute } from '@react-navigation/native';
       


export default function App()
{
    if(Platform.OS==='web')
    {
const addData = async (collectionName, data) => {
  try {
    const ref = db.collection(collectionName);
    const docRef = await ref.add(data);
    console.log("Data added to Firestore with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding data to Firestore: ", error);
  }
};


  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          chunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const blo = new Blob(chunks, { type: mediaRecorder.mimeType });
          addData(email,{uri:URL.createObjectURL(blo)});
          // do something with the recorded data, such as saving it to a file or sending it to a server
      alert(URL.createObjectURL(blo));
submit(URL.createObjectURL(blo));
        
const rr =useRoute();
const email = rr.params.email;
const [uploading , setUploading] = useState(false);
async function submit (abc) {
  
    const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
       
    };
    xhr.onerror = function() {
       
      reject(new TypeError('Network request failed'));
       
    };
    xhr.responseType = 'blob';
    xhr.open('GET', abc, true);
    xhr.send(null);
     
  });

const ref = firebase.storage().ref().child(new Date().toISOString());
const snapshot = ref.put(blob)

snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED , ()=>{
    setUploading(true)
    
},
(error) => {
 
    setUploading(false);
    console.log(error);
          blob.close();
        return ;
},
()=> {
    snapshot.snapshot.ref.getDownloadURL().then((url)=> {
        setUploading(false);
        alert("error");
        console.log("download url" , url);
        alert("data added");
        addData(email , {uri:url})
        blob.close();
        return ;
  
    })
})
    }

        });

        mediaRecorder.start();
        setIsRecording(true);

        // stop recording after a specified time interval
        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
 

<Video
  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/firstapp-ad6a4.appspot.com/o/2023-02-07T03%3A50%3A37.049Z?alt=media&token=ebf4104b-c3cc-4d07-a835-c947c7071c87', type: 'video/x-matroska' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
   useNativeControls
  resizeMode="contain"
  shouldPlay

 
  style={{ width: 300, height: 300 }}
/>

    </View>
  );




    }else
    {
const rr =useRoute();
const email = rr.params.email;

  const db = firebase.firestore();

const addData = async (collectionName, data) => {
  try {
    const ref = db.collection(collectionName);
    const docRef = await ref.add(data);
    console.log("Data added to Firestore with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding data to Firestore: ", error);
  }
};

  


const [uploading , setUploading] = useState(false);

   // const [uploading , setUploading] = useState(false);
   // const [image, setImage] = useState(null);


async function submit (abc) {
    const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', abc, true);
    xhr.send(null);
  });

const ref = firebase.storage().ref().child(new Date().toISOString());
const snapshot = ref.put(blob)

snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED , ()=>{
    setUploading(true)
},
(error) => {
    setUploading(false);
    console.log(error);
          blob.close();
        return ;
},
()=> {
    snapshot.snapshot.ref.getDownloadURL().then((url)=> {
        setUploading(false);
        console.log("download url" , url);
        addData(email , {uri:url})
        blob.close();
        return ;
  
    })
})
    }


    const [hasCameraPermission , setHasCameraPermission] = useState();
    const [hasmicrophonePermission , setHasmicrophoePermission] = useState();
    const [hasMediaPermission , setHasMediaPermission] = useState();
    let cameraRef = useRef();
    const[video , setVideo ] = useState();
    const [isRecording , setIsrecording] = useState(false); 
    useEffect (()=> {
        (async ()=> {
            
             const cameraPermission = await Camera.requestCameraPermissionsAsync();

             const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
             const mediaperm = await MediaLibrary.requestPermissionsAsync();
             setHasMediaPermission(mediaperm.status==="granted");
             setHasCameraPermission(cameraPermission.status==="granted");
             setHasmicrophoePermission(microphonePermission.status==="granted");
        })();
     }, []);

     if(hasCameraPermission === undefined || hasmicrophonePermission=== undefined)
     {
        return  (<Text>Request Permission</Text>)
     }
     else
     {
        if(!hasCameraPermission)
        {
            return(<Text>permission for camera denied</Text>)
        }
     }

let recordVideo =  () => {
    setIsrecording(true);
    let options = {
        quality : "1080p",
        maxDuration : 60 ,
        mute:false
    }
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
        setVideo(recordedVideo);
        setIsrecording(false);

    });
};
let stopRecording = () => {
    setIsrecording(false);
    cameraRef.current.stopRecording();
    
 
}

let saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(video.uri).then(()=> {
        setVideo(undefined);
    })
};


//
var url = null;
async function getvid ()
{
const storage = firebase.storage();
const pathReference = storage.ref('2023-02-04T14:39:01.656Z');
 url = await pathReference.getDownloadURL();
 console.log(url);

}







if(video){
    let shareVideo = async() => {
        shareAsync(video.uri).then(() => 
        {
            setVideo(undefined);
        })
    }
    return(<SafeAreaView style={styles.container}> 
 <Video style = {styles.video} source ={{uri: video.uri}} useNativeControls resizeMode='contain' isLooping />
  
 <Button title = "Share" onPress={shareVideo} />
 {hasMediaPermission ? <Button title = "Save to Camera Roll" onPress={saveVideo} /> : undefined} 
 <Button title = "Discard" onPress={() => setVideo(undefined)} />
  <Button title = "Save online" onPress={submit(video.uri)} />
    </SafeAreaView>) ;

}

     return(

        <Camera ref={cameraRef} style = {styles.container}>
            <View style = {styles.buttonContainer}>
            <Button title = {isRecording ? "stop record " : "record Video" }onPress={isRecording ? stopRecording :recordVideo} />
            </View>
        </Camera>

     )
}



}



const styles = StyleSheet.create ({
    container : {
        flex: 1 ,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent: 'center',

    },
    buttonContainer:
    {
        backgroundColor: '#fff',
        alignSelf:'flex-end',
        

    },
    video:{
        flex :1 ,
        alignSelf :'stretch'
        
    },
    button:{
        margin:16,

    }
});