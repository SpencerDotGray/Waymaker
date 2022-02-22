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
 import PersonHomeScreen from '../screens/PersonScreens/PersonHomeScreen';
 import PersonSettingsScreen from '../screens/PersonScreens/PersonSettingsScreen';
 import PersonSearchScreen from '../screens/PersonScreens/PersonSearchScreen';
 import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
 import { BottomNavigation } from 'react-native-paper';
 import { useState } from 'react';

 export default function PersonTabNavigator({ navigation }) {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home', color: '#4682b4'},
    { key: 'search', title: 'Search', icon: 'magnify', color: '#0000cd' },
    { key: 'settings', title: 'Settings', icon: 'cog', color: '#003366' }
  ]);

  const renderScene = ({ route }) => {
    switch(route.key) {
      case 'home':
        return <PersonHomeScreen navigation={navigation}/>;
      case 'search':
        return <PersonSearchScreen navigation={navigation}/>;
      case 'settings':
        return <PersonSettingsScreen navigation={navigation} />;
    }
  };

  return(
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}

      shifting={true}
    />
  );
}