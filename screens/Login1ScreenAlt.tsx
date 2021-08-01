import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../components/Themed';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;

const Button = ({ buttonName }: { buttonName: string }) => {

    return (
        <TouchableOpacity 
            style={ [styles.buttonStyle] }
            onPress={() => Alert.alert('Button Pressed')}
        >
            <Text style={ styles.buttonTextStyle }>
                {buttonName}
            </Text>
        </TouchableOpacity>
    );
}

export default function Login1Screen() {
    return (
        <View style={styles.container}>
            <BlankSpacer height={50} />
            <Text style={styles.title}>I am a(n)...</Text>

            <View style={styles.buttonContainer}>
                <Button buttonName='Church' />
                <BlankSpacer height={wHeight/12} />
                <Button buttonName='Missionary' />
                <BlankSpacer height={wHeight/12} />
                <Button buttonName='Individual' />
            </View>
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
    },
    buttonStyle: {
        width: 200,
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#6495ed',
    },
    buttonTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    }
});