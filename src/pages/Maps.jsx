import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, View } from 'react-native';

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

const[coords, setCoords] = useState({
    latitude: 0,
    longitude: 0
  });

const Maps = () => {

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
        </View>
  )
}

export default Maps