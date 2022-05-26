import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from '../Stacks/HomeStack';
import Maps from './Maps'
import { Icon } from '@rneui/base';

const Tab = createBottomTabNavigator();

const HomePage = ({ navigation }) => {

    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            return;
        })
    )

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
          <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false, tabBarIcon: ({tintColor}) => (
            <Icon
                name="home"
                color={tintColor}
                size={24}
            />
        ) }} />
          <Tab.Screen name="Maps" component={Maps} options={{ headerShown: false, tabBarIcon: ({tintColor}) => (
            <Icon
                name="room"
                color={tintColor}
                size={24}
            />
        ) }} />
          <Tab.Screen name="Profile" component={Maps} options={{ headerShown: false, tabBarIcon: ({tintColor}) => (
            <Icon
                name="person"
                color={tintColor}
                size={24}
            />
        ) }} />
        </Tab.Navigator>
  )
}

export default HomePage