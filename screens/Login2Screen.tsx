import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import Button from '../components/Button';
import { useState } from 'react';

import BlankSpacer from 'react-native-blank-spacer';
import { KeyboardAvoidingView } from 'react-native'

import { Text, View } from '../components/Themed';
import Navigation from '../navigation';
import { propTypes } from 'react-spacer';

import { firebase }  from '../firebase/config'

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const fb = firebase.default

export default function Login2Screen({ route, navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = () => {
        fb
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then( (response) => {

                const uid = response.user.uid
                const usersRef = fb.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then( firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert(`User does not exist ${email} ${password}`)
                            return;
                        } else if (firestoreDocument.data().accountType != route.params.loginType) {
                            alert(`User is not a ${route.params.loginType} account`)
                            return;
                        }
                        const user = firestoreDocument.data()
                        // navigation.reset({
                        //     index: 0,
                        //     routes: [{name: `${route.params.loginType}Home`, params: {user}}]
                        // });
                        navigation.navigate(`${route.params.loginType}Home`, {user})
                    })
                    .catch( error => { alert(error) } )
            })
            .catch( error => { alert(error) } )
    }

    return (
        <View style={styles.container} >
        <BlankSpacer height={100} />
            <Text style={styles.title}>{ route.params.loginType } Login</Text>

            <View style={styles.loginContainer}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder='Username/Email'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                /> 
                <BlankSpacer height={25} />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => navigation.replace('Register', route.params)} style={styles.link}>
                    <Text style={styles.linkText}>don't have an account? register here</Text>
                </TouchableOpacity>
                <BlankSpacer height={50} />
                <Button label='Login' action={ () => onLoginPress() } />
                
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
    }
});