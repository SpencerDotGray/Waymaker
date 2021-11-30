import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
// import Button from '../components/Button'
import { useState } from 'react';
import { Button, Menu, Provider as PaperProvider } from 'react-native-paper';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../../components/Themed';
import Navigation from '../../navigation';
import { propTypes } from 'react-spacer';
import { WaymakerFirebase, WaymakerFirebaseInstance } from "../../firebase/WaymakerFB";
import AddPostContainer from '../../components/AddPostContainer';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const firebase: WaymakerFirebase = WaymakerFirebaseInstance().getInstance();

export default function MissionaryHomeScreen({ route, navigation }) {

    const [email, setEmail] = useState('mission@test.com')
    const [password, setPassword] = useState('password')

    return (
        <PaperProvider>
        <View style={styles.container}>
        <BlankSpacer height={85} />
            <Text style={styles.title}>Home</Text>

            <BlankSpacer height={50} />
            
            <AddPostContainer />

            <BlankSpacer height={150} />
        </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    linkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
      marginTop: 0,
      paddingVertical: 15,
    },
    title: {
        fontSize: 40,
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
        height: wHeight * 0.060,
        fontSize: 22,
        paddingStart: 10,
        justifyContent: 'center'
    }
});