import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import Button from '../components/Button';
import { useState } from 'react';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../components/Themed';
import Navigation from '../navigation';
import { propTypes } from 'react-spacer';

import { firebase }  from '../firebase/config'

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const fb = firebase.default

export default function RegisterScreen({ route, navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')

    const onRegisterPress = () => {

        if (confirmPassword != password) {
            alert('Passwords do not match')
            return;
        } 
        fb
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( (response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    accountType: route.params.loginType,
                    name: `${fName} ${lName}`,
                    firstName: fName,
                    lastName: lName, 
                    posts: []
                };
                const userRef = fb.firestore().collection('users')
                userRef
                    .doc(uid)
                    .set(data)
                    .then( () => {
                        navigation.navigate(`${route.params.loginType}Home`, {user: data})
                    })
                    .catch( (error) => { alert(error) } )
            })
            .catch( (error) => { alert(error) } )
    }

    return (
        <View style={styles.container}>
        <BlankSpacer height={85} />
            <Text style={styles.title}>{ route.params.loginType } Register</Text>

            <BlankSpacer height={50} />
            <View style={styles.loginContainer}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder='First Name'
                    onChangeText={(text) => setFName(text)}
                    value={fName}
                /> 
                <BlankSpacer height={25} />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder='Last Name'
                    onChangeText={(text) => setLName(text)}
                    value={lName}
                /> 
                <BlankSpacer height={25} />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder='Email'
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
                <BlankSpacer height={25} />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => navigation.replace('Login', route.params)} style={styles.link}>
                    <Text style={styles.linkText}>already have an account? login here</Text>
                </TouchableOpacity>
                <BlankSpacer height={50} />
                <Button label='Register' action={ () => onRegisterPress() } />                
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