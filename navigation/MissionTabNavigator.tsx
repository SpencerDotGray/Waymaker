/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MissionaryHomeScreen from '../screens/MissionaryScreens/MissionaryHomeScreen';
import PersonSettingsScreen from '../screens/PersonScreens/PersonSettingsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

export default function MissionTabNavigator() {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home', color: '#4682b4'},
    { key: 'search', title: 'Search', icon: 'magnify', color: '#0000cd' },
    { key: 'settings', title: 'Settings', icon: 'cog', color: '#003366' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: MissionaryHomeScreen,
    search: MissionaryHomeScreen,
    settings: PersonSettingsScreen
  });

  return(
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}

      shifting={true}
    />
  );
}

