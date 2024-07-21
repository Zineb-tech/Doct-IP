import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { RNCamera } from 'react-native-camera';

const takePicture = async (cameraRef) => {
  if (cameraRef.current) {
    const options = { quality: 0.5, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    console.log(data.uri);
  }
};

const CheckIn = () => {
  const cameraRef = useRef(null);

  return (
    <View style={styles.container}>
       <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
         
        </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});



export default CheckIn;
