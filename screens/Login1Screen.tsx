import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import Button from '../components/Button'

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../components/Themed';
import Navigation from '../navigation';
import { propTypes } from 'react-spacer';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;

export default function Login1Screen({ navigation }) {
    return (
        <View style={styles.container}>
            <BlankSpacer height={100} />
            <Text style={styles.title}>I am a...</Text>
            
            <View style={styles.buttonContainer}>
                <Button label='Church' action={ () => {navigation.push('Login', {loginType: 'Church'})} } />
                <BlankSpacer height={wHeight/12} />
                <Button label='Missionary' action={ () => {navigation.push('Login', {loginType: 'Missionary'})} } />
                <BlankSpacer height={wHeight/12} />
                <Button label='Person' action={ () => {navigation.push('Login', {loginType: 'Person'})} } />
            </View>
            <BlankSpacer height={85} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold'
    }
});