import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { FlatList, Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
// import Button from '../components/Button'
import { useState, useEffect } from 'react';
import { Button, Menu, Provider as PaperProvider, Modal as PaperModal } from 'react-native-paper';

import BlankSpacer from 'react-native-blank-spacer';

import { Text, View } from '../../components/Themed';
import Navigation from '../../navigation';
import { propTypes } from 'react-spacer';
import { WaymakerFirebase, WaymakerFirebaseInstance } from "../../firebase/WaymakerFB";
import AddPostContainer from '../../components/AddPostContainer';
import PostCard from '../../components/PostCard';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const firebase: WaymakerFirebase = WaymakerFirebaseInstance().getInstance();

export default function MissionaryHomeScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    
    var deletePost = (postId: string) => {

        firebase.RemovePostById(postId, (result: boolean) => {
            console.log(result)
        })
    }

    useEffect( () => {
        firebase.GetPostIds( (result) => {
            setPosts(result);
        })
    });

    return (
        <View style={styles.container}>
            <BlankSpacer height={85} />
                <Text style={styles.title}>Missionary Home</Text>

                <BlankSpacer height={50} />
                
                
                <Button onPress={ () => { setModalVisible(true) }}>Add Post</Button>
                <FlatList
                data={posts}
                renderItem={({item}) => <PostCard postId={item} userCategory='Missionary' deletePostFunction={deletePost} />} />

                <BlankSpacer height={150} />


                <PaperModal 
                    visible={modalVisible}
                    onDismiss={ () => { setModalVisible(false); }}
                    style={styles.modal_container}
                >
                    <AddPostContainer finishAction={ () => { setModalVisible(false); }} />
                </PaperModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner_container: {
        flex: 1,
        alignItems: 'center'
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
        justifyContent: 'center'
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});