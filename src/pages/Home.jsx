import React from 'react'
import { Pressable, StyleSheet, View, Text, TextInput, StatusBar } from 'react-native';
import { SocialIcon, Divider } from '@rneui/themed';

const Home = ({navigation}) => {

  const onPress = () => {
    alert("login")
  }

  const signupHandler = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={[styles.container, {
        flexDirection: "column"
      }]}>

        <StatusBar
                animated={true}
                hidden={true} />

        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontWeight: 'bold', fontSize: 40}}>SHLOOT</Text>
        </View>
        <View style={{ flex:4, justifyContent: 'flex-start', alignItems: 'center', padding: 50, backgroundColor: '#ffffff', borderTopEndRadius
      : 150, borderBottomStartRadius: 150 }}>
          <Text style={{alignSelf: 'auto', fontSize: 15, marginBottom: 15 }}>Welcome back !</Text>
          <TextInput style={styles.input} placeholder='Username' />
          <TextInput style={styles.input} placeholder='Password' />
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>
        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <View style={{ flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 2, padding: 10 }}>
              <Divider style={{ flex: 5, backgroundColor: '#e5e5e5', height: 1  }} />
              <Text style={{ flex: 1, textAlign: 'center', color: '#ababab' }}>or</Text>
              <Divider style={{ flex: 5, backgroundColor: '#e5e5e5', height: 1 }} />
            </View>
            <View style={{ flex: 8, width: '100%', flexDirection: 'row', margin: 6, justifyContent: 'center', alignItems: 'flex-start', padding: 15}}>
              <SocialIcon type="facebook" style={{ backgroundColor: '#ffffff' }} iconSize={34} iconColor="#000" onPress={() => alert('test')} />
              <SocialIcon type="instagram" style={{ backgroundColor: '#ffffff' }} iconSize={34} iconColor="#000" onPress={() => alert('test')} />
            </View>
            <View style={{ flex: 3, width: '100%', alignItems: 'center'}}>
              <Text style={{ fontSize: 14, color: 'gray' }}>Don't have an account ?
                <Pressable>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }} onPress={signupHandler}>&nbsp;&nbsp;Sign Up</Text>
                </Pressable>
              </Text>
            </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      marginTop: 25,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderColor: '#e5e5e5',
      padding: 10,
      width: '80%'
    },
  });

export default Home