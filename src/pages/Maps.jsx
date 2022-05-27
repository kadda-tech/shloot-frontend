import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '@rneui/base';
import { Camera } from 'react-native-vision-camera';

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

const Maps = ({ navigation }) => {
  
  const [cameraGrants, setCameraGrants] = useState(false)

  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0
  });

    useEffect(() => {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords
            setCoords({latitude, longitude})
            console.log(position.coords)
          },
          error => Alert.alert('Error', JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        // this.watchID = Geolocation.watchPosition(position => {
        //   const lastPosition = JSON.stringify(position);
        //   this.setState({lastPosition});
        // });
      }, [])

      const cameraHandler = () => {;

        const requestCameraPermission = async () => {
          setCameraGrants(false)
          const cameraPermission = await Camera.requestCameraPermission()
          const cameraPermissionStatus = await Camera.getCameraPermissionStatus()
          setCameraGrants(cameraPermissionStatus)
          console.log(cameraPermissionStatus)
        }

        requestCameraPermission().catch( error => console.log( error ) )

      }

      useEffect(() => {
        if (cameraGrants === 'authorized') navigation.navigate('Camera')
      }, [navigation, cameraGrants])

    return (
        <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0421,
            }}
            >
              <Marker coordinate={coords}></Marker>
            </MapView>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                position: 'absolute',
                bottom: 20,
                right: 30,
                height: 70,
                backgroundColor: '#ffffff78',
                borderRadius: 100,
              }}
              onPress={cameraHandler}
            >
              <Icon name='photo-camera' size={30} />
            </TouchableOpacity>
        </View>
  )
}

export default Maps