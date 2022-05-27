import { Icon } from '@rneui/base';
import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraStack = ({ navigation }) => {

    let devices = useCameraDevices()
    let device = devices.back

    const camera = useRef(null)

      if (!device) return ( <Text>Loading Camera</Text> )

      const closeCameraHandler = () => {
          navigation.navigate('Maps')
      }

    const onCaptureHandler = async () => {
        const photo = await camera.current.takePhoto({
            flash: 'off'
        })
        console.log(photo)
    }

  return (
      <View>
        <Camera
            style={{ width: '100%', height: '100%' }}
            device={device}
            isActive={true}
            photo={true}
            ref={camera}
        />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 15,
                        left: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={closeCameraHandler}
                    >
                    <Icon name='keyboard-arrow-down' size={50} color='#ffffff' style={{ fontWeight: 10 }} />
                </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        backgroundColor: '#ffffff2e',
                        borderRadius: 100,
                    }}
                    onPress={onCaptureHandler}
                    >
                    <Icon name='photo-camera' size={40} color='#ffffff' />
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default CameraStack