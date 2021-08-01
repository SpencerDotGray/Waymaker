import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import Button from '../components/Button';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../components/Themed';
import Navigation from '../navigation';
import { propTypes } from 'react-spacer';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;

export default function Login2Screen({ route, navigation }) {
    return (
        <View style={styles.container}>
        <BlankSpacer height={100} />
            <Text style={styles.title}>{ route.params.loginType } Login</Text>

            <View style={styles.loginContainer}>
                <TextInput style={styles.inputStyle}
                    placeholder='Username/Email'
                /> 
                <BlankSpacer height={25} />
                <TextInput style={styles.inputStyle}
                    placeholder='Password'
                    secureTextEntry
                />
                <View style={[styles.loginContainer, {flexDirection: 'row', margin: 0}]}>
                    <Button label='Login' action={ () => { Alert.alert('Login Attempt') } } />
                    <Button label='Forgot Password' action={ () => { Alert.alert('Forgot Password') } } />
                </View>
                
            </View>

            <BlankSpacer height={150} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold'
    },
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
        alignItems: 'center'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        width: wWidth * 0.60,
        height: wHeight * 0.075,
        fontSize: 22,
        paddingStart: 10,
        justifyContent: 'center'
    }
});