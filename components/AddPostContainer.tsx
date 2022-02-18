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

export default function AddPostContainer({ finishAction }: { finishAction: Function }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View style={styles.container}>
            <TextInput 
                style={[styles.inputStyle, styles.titleInputStyle]}
                placeholder='Title'
                onChangeText={(text) => setTitle(text)}
                value={title}
            /> 
            <TextInput
                multiline
                numberOfLines={10}
                placeholder='Description'
                style={[styles.inputStyle, styles.descriptionInputStyle]} 
                onChangeText={(text) => setDescription(text)}
                value={description}
            /> 
            <Button onPress={ () => { firebase.AddMissionaryPost(title, description, (result) => {
                if (result) {
                    console.log("Post Sucessfull");
                    setTitle('');
                    setDescription('');
                }
                finishAction();
            }) }}>Post</Button>
            <Button onPress={ () => { finishAction(); }}>Cancel</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderColor: 'slategrey',
        borderWidth: 1,
        backgroundColor: '#BFE5D9',
        borderRadius: 15,
        maxWidth: wWidth * 0.75,
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        width: wWidth * 0.60,
        paddingStart: 10,
        marginTop: 25
    },
    titleInputStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        height: wHeight * 0.060,
        justifyContent: 'center',
    },
    descriptionInputStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlignVertical: 'top',
        paddingTop: 10
    }
});
