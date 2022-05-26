import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native';
import { SocialIcon, Divider } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { useValidation } from 'react-native-form-validator';

const SignUp = ({ navigation }) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const nameHandler = (value) => {
    setName(value)
  }

  const emailHandler = (value) => {
    setEmail(value)
  }

  const passwordHandler = (value) => {
    setPassword(value)
  }

  const passwordConfirmationHandler = (value) => {
    setConfirmPassword(value)
  }

  const backToLoginHandler = () => {
    navigation.navigate('SignIn')
  }

  const signUpHandler = () => {
    fetch('http://10.0.2.2:4001/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then((response) => {
      if (response.status === 201) {
        console.log("signed up")
        navigation.navigate('HomePage')
      } else {
        console.log("error singing up, status <> 200 !")
        console.log(JSON.stringify(response))
      }
    })
    .catch((error) => {
      console.log("error singing up");
      console.log(JSON.stringify(error))
    });
  }

  return (
         
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>

      <View style={{ flex: 2, alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
        <Pressable onPress={backToLoginHandler} style={{ margin: 30, padding: 10, backgroundColor: '#ffffff', borderRadius: 30 }} >
          <Icon name="navigate-before" size={24} />
        </Pressable>
        <Text style={{ fontWeight: 'bold', fontSize: 40 }}>SHLOOT</Text>
      </View>
      <View style={{ flex:5, justifyContent: 'flex-start', alignItems: 'center', padding: 50, backgroundColor: '#ffffff', borderTopStartRadius
    : 150, borderBottomEndRadius: 150 }}>
        <Text style={{alignSelf: 'auto', fontSize: 15, marginBottom: 15 }}>Create account</Text>
        <TextInput style={styles.input} placeholder='Full name' onChangeText={(value) => nameHandler(value)} />
        <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => emailHandler(value)} />
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(value) => passwordHandler(value)} />
        <TextInput style={styles.input} placeholder='Confirm password' secureTextEntry={true} onChangeText={(value) => passwordConfirmationHandler(value)} />
      </View>
      <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
           <Pressable style={styles.button} onPress={signUpHandler}>
              <Text style={styles.text}>Sign Up</Text>
            </Pressable>
            <View style={{ flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 2, padding: 10 }}>
            <Divider style={{ flex: 5, backgroundColor: '#e5e5e5', height: 1  }} />
            <Text style={{ flex: 1, textAlign: 'center', color: '#ababab' }}>or</Text>
            <Divider style={{ flex: 5, backgroundColor: '#e5e5e5', height: 1 }} />
          </View>
          <View style={{ flex: 8, width: '100%', flexDirection: 'row', margin: 6, justifyContent: 'center', alignItems: 'flex-start', padding: 15}}>
            <SocialIcon type="facebook" style={{ backgroundColor: '#ffffff' }} iconSize={34} iconColor="#000" onPress={() => alert('test')} />
            <SocialIcon type="instagram" style={{ backgroundColor: '#ffffff' }} iconSize={34} iconColor="#000" onPress={() => alert('test')} />
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

  export default SignUp