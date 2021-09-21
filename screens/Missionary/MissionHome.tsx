import { StackActions } from '@react-navigation/routers';
import * as React from 'react';
import { Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationProp } from '@react-navigation/native';
import Button from '../../components/Button';
import { useState } from 'react';

import BlankSpacer from 'react-native-blank-spacer';
import { KeyboardAvoidingView, ScrollView, FlatList, ActivityIndicator } from 'react-native'

import { Text, View } from '../../components/Themed';
import Navigation from '../../navigation';
import { propTypes } from 'react-spacer';
import moment from 'moment';

import { firebase }  from '../../firebase/config'
import { getPostsBy, getPostData } from '../../firebase/firebasedata';

var wHeight = Dimensions.get('window').height;
var wWidth = Dimensions.get('window').width;
const fb = firebase.default

export default function MissionHomeScreen({ route, navigation }) {

    const [loading, setLoading] = useState(true)
    const [callingData, setCallingData] = useState(false)
    const [posts, setPosts] = useState([]);
    const [postsNeedCleared, setPostsNeedCleared] = useState(false);
    const [loadDate, setLoadDate] = useState(moment());

    const populatePosts = () => {

        console.log("here");

        getPostsBy([route.params.user.id], (authorPost) => {
            
            var tempList = posts;
            
            getPostData(authorPost, (data) => {
                tempList.push(data);
                setPosts(tempList);
            })
        });
    }

    React.useEffect( () => {

        // if (!postsNeedCleared) {
        //     populatePosts();            
        // } else {
        //     setPosts([]);
        // }
        // setPostsNeedCleared(!postsNeedCleared);

        populatePosts();
    })

    return (
        <View style={styles.container} >
            <BlankSpacer height={100} />
            <Text style={styles.title}>Home</Text>
            
            <FlatList 
                data={posts}
                renderItem = { ({ item }) => (
                    <View style={styles.postContainer}>
                        <Text>Poster: {item.authorName}</Text>
                        <Text>Content: {item.content}</Text>
                    </View>
                )}
            />


            <TouchableOpacity style={styles.addPost} onPress={ () => { navigation.push('MissionAddPost', route.params) } }>
                <Text>Add Post</Text>
            </TouchableOpacity>  

            <TouchableOpacity style={styles.refreshPosts} onPress={populatePosts}>
                <Text>Refresh</Text>
            </TouchableOpacity> 
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
    },
    postContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    refreshPosts: {
        borderRadius: 100,
        position: 'absolute',
        bottom: 40,
        left: 40
    }
});