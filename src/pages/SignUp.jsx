import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View, Text, TextInput, Button } from 'react-native';

const SignUp = ({ navigation }) => {

  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'center', padding: 50 }}>
          <Text style={{alignSelf: 'auto', fontSize: 15, marginBottom: 15 }}>Sign Up</Text>
          <TextInput style={styles.input} placeholder='Username' />
          <TextInput style={styles.input} placeholder='Password' />
          <Pressable style={styles.button}>
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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

  export default SignUp