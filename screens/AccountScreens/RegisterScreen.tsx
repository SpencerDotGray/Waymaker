import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
// import Button from '../components/Button';
import { useState } from 'react';
import { Button, Menu, Provider as PaperProvider } from 'react-native-paper';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../../components/Themed';
import Navigation from '../../navigation';
import { propTypes } from 'react-spacer';
import { WaymakerFirebase, WaymakerFirebaseInstance } from "../../firebase/WaymakerFB";

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const firebase: WaymakerFirebase = WaymakerFirebaseInstance().getInstance();

export default function RegisterScreen({ route, navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [cat, setCat] = useState('Person')
    const [username, setUsername] = useState('')
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <PaperProvider>
        <View style={styles.container}>
            <BlankSpacer height={85} />
            <Text style={styles.title}>Register</Text>

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
                    placeholder='Username'
                    onChangeText={(text) => setUsername(text)}
                    value={username}
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
                <Text>{cat}</Text>
                <Menu 
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show Menu</Button>}>
                    <Menu.Item onPress={() => { setCat('Missionary'); closeMenu(); }} title="Missionary" />
                    <Menu.Item onPress={() => { setCat('Church'); closeMenu(); }} title="Church" />
                    <Menu.Item onPress={() => { setCat('Person'); closeMenu(); }} title="Person" />
                </Menu>

                <TouchableOpacity onPress={() => navigation.replace('Login', route.params)} style={styles.link}>
                    <Text style={styles.linkText}>already have an account? login here</Text>
                </TouchableOpacity>
                <BlankSpacer height={50} />
                <Button onPress={ () => { firebase.CreateAccountWithEmail(email, password, fName, lName, username, cat, (results) => {
                    if (results) {
                        navigation.replace('MissionaryHome', route.params);
                    }
                }) } }>Register</Button>               
            </View>

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