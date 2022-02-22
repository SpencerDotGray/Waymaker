
import * as React from 'react';
import { FlatList, Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler, Modal } from 'react-native';
import { useState } from 'react';
import { Button, Menu, Provider as PaperProvider, Searchbar } from 'react-native-paper';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../../components/Themed';
import { WaymakerFirebase, WaymakerFirebaseInstance } from "../../firebase/WaymakerFB";
import UserCard from '../../components/UserCard';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const firebase: WaymakerFirebase = WaymakerFirebaseInstance().getInstance();

export default function PersonSearchScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const onChangeSearch = (query: string) => {

        setSearchQuery(query);
        if (query === '') {
            setSearchResults([])
        } else {
            firebase.GetMissionUsers(searchQuery, (results: Array<never>) => {
                setSearchResults(results);
            })
        }
    }

    return (
        <PaperProvider>
        <View style={styles.container}>
            <BlankSpacer height={85} />
            <Text style={styles.title}>Person Search</Text>
            <Searchbar 
                placeholder='Search'
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <FlatList
                data={searchResults}
                renderItem={({item}) => <UserCard username={item} /> } 
            />
        </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
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
    },
    modal_container: {
        flex: 1,
        alignItems: 'center'
    }
});