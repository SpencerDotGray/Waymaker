
import * as firebase from 'firebase'
import * as auth from '@firebase/auth';
import * as firestore from '@firebase/firestore';

class WaymakerFirebase {

    db = undefined;
    userdata = undefined;
    user = undefined;

    constructor() {

        const firebaseConfig = {
            apiKey: "AIzaSyCLKNIFGkjxfG7gNJXed7xWD6_Hk7cpMqI",
            authDomain: "waymakr-11d5e.firebaseapp.com",
            projectId: "waymakr-11d5e",
            storageBucket: "waymakr-11d5e.appspot.com",
            messagingSenderId: "889066682104",
            appId: "1:889066682104:web:3dfc89d53cda831df92d0d",
            measurementId: "G-JV4VLNML8B"
        };

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
            this.user = undefined;
        }
    }

    CreateAccountWithEmail = (email, password, firstname, lastname, username, category, callback) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (userCredential) => {

            this.user = userCredential.user;

            firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                Email: email,
                FirstName: firstname,
                LastName: lastname,
                Username: username,
                Category: category,
                FullName: firstname + " " + lastname
            })
            .then( (docRef) => {
                console.log("User Successfully added: " + email + " " + username);
                userdata = docRef.data();
                callback(true);
            })
            .catch( (error) => {
                console.error("Error adding user: " + error);
            })

        }).catch( (error) => {
            throw error;
        });
    }

    LoginAccountWithEmail = (email, password, callback) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (userCredential) => {
            this.user = userCredential.user;

            firebase.firestore().collection('users').doc(userCredential.user.uid).get()
            .then( (docRef) => {
                userdata = docRef.data();
                console.log(userdata);
            })

            callback(true);
        })
        .catch( (error) => {
            callback(false);
        })
    }

    AddMissionaryPost = (title, description, callback) => {

        firebase.firestore().collection('posts').add({
            Title: title,
            Description: description
        })
        .then( (docRef) => {

            if (this.userdata.Posts === undefined) {
                this.userdata.Posts = []
            }
            this.userdata.Posts.push(docRef.id);
            firebase.firestore().collection('users').doc(this.user.uid).set({
                Posts: this.userdata.Posts
            });

            callback(true);
        })
        .catch( (error) => {
            callback(false);
        });
    }
}

var WaymakerFirebaseInstance = (function() {

    var instance;

    function createInstance() {
        return new WaymakerFirebase();
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
});

export { WaymakerFirebaseInstance, WaymakerFirebase };