import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from '../Router/AppStack';
import AuthStack from '../Router/AuthStack';
import useAuth from '../hooks/useAuth';

const Router = () => {
  const {authData} = useAuth();

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router