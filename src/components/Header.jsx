import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

const Header = ({navigation}) => {

  useEffect(()=> {
    console.log("test")
  }, [])

  return (
    <View style={{ backgroundColor: 'red' }}>
        <Text style={{fontWeight: 'bold', fontSize: 40}}>SHLOOT</Text>
    </View>
  )
}

export default Header