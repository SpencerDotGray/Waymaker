import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import Button from '../../components/Button';
import { useState } from 'react';

import BlankSpacer from 'react-native-blank-spacer';
import { KeyboardAvoidingView } from 'react-native'

import { Text, View } from '../../components/Themed';
import Navigation from '../../navigation';
import { propTypes } from 'react-spacer';

import { firebase }  from '../../firebase/config'

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const fb = firebase.default

export default function MissionAddPostScreen({ route, navigation }) {

    const [post, setPost] = useState('')

    const onPostPress = () => { 

        if (post === '') {
            alert('Message cannot be empty');
            return;
        }

        const userRef = fb.firestore().collection('users').doc(route.params.user.id);
        const postRef = fb.firestore().collection('posts');

        postRef.add({
            content: post,
            authorID: route.params.user.id,
            authorName: route.params.user.name,
            timestamp: fb.firestore.FieldValue.serverTimestamp(),
        }).then( documentRef => {
            userRef.update({
                posts: fb.firestore.FieldValue.arrayUnion(documentRef)
            }).then( () => {
                route.params.user.posts.push(documentRef.path)
                navigation.pop(1, route.params)
            })
        })
    }

    return (
        <View style={styles.container} >
            <BlankSpacer height={100} />
            <TextInput 
                style={styles.inputStyle}
                placeholder='Write an update...'
                onChangeText={(text) => setPost(text)}
                value={post}
            />
            <Button label='Post' action={ () => { onPostPress() } } />   
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
    },
    addPost: {
        borderRadius: 100,
        position: 'absolute',
        bottom: 40,
        right: 40
    }
});