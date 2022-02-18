import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { Button, Menu, Provider as PaperProvider } from 'react-native-paper';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { WaymakerFirebase, WaymakerFirebaseInstance } from "../firebase/WaymakerFB";
import { red } from '@material-ui/core/colors';
const firebase: WaymakerFirebase = WaymakerFirebaseInstance().getInstance();

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;

export default function PostCard({ postId, userCategory, deletePostFunction }: { postId: string, userCategory: string, deletePostFunction: Function }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState('');
    const [postDate, setPostDate] = useState('');

    let deleteComponent;

    if (userCategory == 'Missionary') { 
        deleteComponent = <Button labelStyle={styles.delete_button} onPress={ () => { deletePostFunction(postId) } }>DELETE POST</Button>
    } else {
        deleteComponent = null;
    }

    firebase.GetPostById(postId, (results) => {
        setTitle(results.title);
        setDescription(results.description);
        setUser(results.name);
        setPostDate(results.postDate);
    });

    return (
        <View style={styles.card}>
            <Text style={styles.card_title}>{title}</Text> 
            <Text style={styles.card_user}>{user} - {postDate}</Text>
            <Text style={styles.card_description}>{description}</Text>
            {deleteComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'slategrey',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        minWidth: wWidth,
        paddingTop: 10,
        paddingBottom: 10
    },
    card_title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingStart: 10
    },
    card_description: {
        fontSize: 18,
        fontWeight: 'normal',
        paddingStart: 10,
        marginTop: 20
    },
    card_user: {
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'italic',
        paddingStart: 25
    },
    delete_button: {
        color: "#D62D20"
    }
});
