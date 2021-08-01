import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function Button({ label, action }: { label: string, action: Function }) {
  return (
    <TouchableOpacity 
        style={ [styles.buttonStyle] }
        onPress={ () => { action() } }
    >
        <Text style={ styles.buttonTextStyle }>
            {label}
        </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 175,
        height: 65,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#6495ed',
        justifyContent: 'center',
    },
    buttonTextStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    }
});
