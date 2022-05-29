import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Icon } from '@rneui/base';
import { Camera } from 'react-native-vision-camera';
import useAuth from '../hooks/useAuth';

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
  
  // const [cameraGrants, setCameraGrants] = useState(false)

  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0
  });

  const [spots, setSpots] = useState([])

  const {authData} = useAuth();

    const fetchSpots = (async () => {
      fetch('http://10.0.2.2:4001/discover', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': authData
      }
    })
    .then((response) => response.json())
    .then(data => {
      setSpots(data)
    })
    .catch((error) => {
      console.log("error fetching data");
      console.error(JSON.stringify(error))
    });

    })

    useEffect(() => {

        fetchSpots()

        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords
            setCoords({latitude, longitude})
          },
          error => Alert.alert('Error', JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        // this.watchID = Geolocation.watchPosition(position => {
        //   const lastPosition = JSON.stringify(position);
        //   this.setState({lastPosition});
        // });

        console.log(spots.length)
      }, [])

      // const cameraHandler = () => {;

      //   const requestCameraPermission = async () => {
      //     setCameraGrants(false)
      //     const cameraPermission = await Camera.requestCameraPermission()
      //     const cameraPermissionStatus = await Camera.getCameraPermissionStatus()
      //     setCameraGrants(cameraPermissionStatus)
      //     console.log(cameraPermissionStatus)
      //   }

      //   requestCameraPermission().catch( error => console.log( error ) )

      // }

      // useEffect(() => {
      //   if (cameraGrants === 'authorized') navigation.navigate('Camera')
      // }, [navigation, cameraGrants])

      const openImageHandler = (imgsrc, lat, lon) => {
        navigation.navigate('Image', {
          imgsrc,
          lat,
          lon,
          origLat: coords.latitude,
          origLon: coords.longitude,
        })
      }

    return (
        <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.00221,
            }}
            >
              <Marker coordinate={coords}></Marker>
              {spots.map((spot, key) => (
                <Marker key={key} coordinate={{latitude: Number(spot.latitude), longitude: Number(spot.longitude)}} 
                  onPress={() => openImageHandler(spot.imgsrc, spot.latitude, spot.longitude)}>
                  <View style={{ width: 70, height: 50 }}>
                      <Image
                        style={{ width: 70, height: 50, borderRadius: 10 }}
                        source={{
                          uri: spot.imgsrc,
                        }}
                      />
                  </View>
                </Marker>
              ))}
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
                display: 'none',
              }}
              // onPress={cameraHandler}
            >
              <Icon name='photo-camera' size={30} />
            </TouchableOpacity>
        </View>
  )
}

export default Maps