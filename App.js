import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { LogBox } from 'react-native';
import ReloadContext from './src/context/ReloadContext'
import { useMemo } from 'react';
import { useState } from 'react/cjs/react.development';

LogBox.ignoreAllLogs();
export default function App() {
  const [reload, setReload] = useState(false)

  const changeReload = (status) => {
    setReload(status)
  }

  const reloadData = useMemo(
    () => ({
      reload,
      changeReload
    }), 
    [reload]
  );


  return (
    <ReloadContext.Provider value={reloadData}>
      <NavigationContainer>
        <StatusBar backgroundColor="#4b0082" style="light" />
        <Navigation />
      </NavigationContainer>
    </ReloadContext.Provider>
  );
}


