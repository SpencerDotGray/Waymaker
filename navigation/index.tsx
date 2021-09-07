/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';


import BottomTabNavigator from './BottomTabNavigator';
import Login1Screen from '../screens/Login1Screen'; 
import Login2Screen from '../screens/Login2Screen'; 
import RegisterScreen from '../screens/RegisterScreen';
import MissionHomeScreen from '../screens/Missionary/MissionHome';
import MissionAddPostScreen from '../screens/Missionary/MissionAddPost';


import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={Login1Screen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Login" component={Login2Screen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MissionaryHome" component={MissionHomeScreen} />
      <Stack.Screen name="MissionAddPost" component={MissionAddPostScreen} />
    </Stack.Navigator>
  );
}
