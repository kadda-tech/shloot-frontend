import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HomePage from '../pages/HomePage';
import ImagePage from '../pages/ImagePage';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Image" component={ImagePage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default AppStack