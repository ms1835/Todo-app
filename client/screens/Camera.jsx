import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import * as ImagePicker from "expo-image-picker";

export default function Camera({ route }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState();

  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openImagePicker = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      if(route.params.updateProfile)
        return navigation.navigate("profile", { image: result?.assets[0]?.uri })
      else
        return navigation.navigate("register", { image: result?.assets[0]?.uri })
    }
  }

  const takePicture = async() => {
    if(camera){
        const data = await camera.takePictureAsync();
        console.log(data);
        return navigation.navigate("register", { image: data?.uri })
    }
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={(e) => setCamera(e)}>
        <View style={styles.buttonContainer}>
          <Icon name='image' color='#fff' size={40} onPress={openImagePicker} />
          <Icon name='camera' color='#fff' size={40} onPress={takePicture} />
          <Icon name='flip-camera-android' color='#fff' size={40} onPress={toggleCameraFacing} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 10,
    width: '100%',
    justifyContent: "space-evenly"
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    padding: 8,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  }
});