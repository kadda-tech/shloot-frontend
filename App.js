import React, { useEffect, useState } from 'react'
import AuthProvider from './src/context/AuthProvider';
import { getToken, removeToken } from './src/config/token';
import Router from './src/pages/Router';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
