import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { firebase } from './firebase/config';
import { Alert, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'


export default function App() {
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </PaperProvider>
  );
}
