import { Icon } from '@rneui/base'
import React from 'react'
import { TouchableOpacity, View, Image, Linking } from 'react-native'

const ImagePage = ({ navigation, route }) => {

  const { imgsrc, lat, lon, origLat, origLon } = route.params;

  const directionHandler = () => {
    // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    // var url = scheme + `${lat},${lon}`;
    // console.log(url)
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origLat},${origLon}&destination=${lat},${lon}`
    console.log(url)
    Linking.openURL(url);
    // navigation.goBack()
  }

  return (
    <View style={{  }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 15,
                        left: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                    }}
                    onPress={() => navigation.goBack()}
                    >
                    <Icon name='close' size={50} color='#ffffff' style={{ fontWeight: 10 }} />
                </TouchableOpacity>

                  <Image
                          style={{ width: '100%', height: '100%', borderRadius: 10 }}
                          source={{
                            uri: imgsrc,
                          }}
                        />

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        backgroundColor: '#383838a8',
                        padding: 10,
                        borderRadius: 30
                    }}
                    onPress={directionHandler}
                    >
                    <Icon name='near-me' size={30} color='#ffffff' style={{ fontWeight: 10 }} />
                </TouchableOpacity>

        </View>
  )
}

export default ImagePage