import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { Button, Menu, Provider as PaperProvider } from 'react-native-paper';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { WaymakerFirebase, WaymakerFirebaseInstance } from "../firebase/WaymakerFB";
const firebase: WaymakerFirebase = WaymakerFirebaseInstance().getInstance();

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;

export default function AddPostContainer({ }: { }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View>
            <TextInput 
                style={styles.inputStyle}
                placeholder='Title'
                onChangeText={(text) => setTitle(text)}
                value={title}
            /> 
            <TextInput 
                style={styles.inputStyle}
                placeholder='Description'
                onChangeText={(text) => setDescription(text)}
                value={description}
            /> 
            <Button onPress={ () => { firebase.AddMissionaryPost(title, description, (result) => {
                if (result) {
                    console.log("Post Sucessfull");
                }
            }) }}>Post</Button>
        </View>
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
