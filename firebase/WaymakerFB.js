
import * as firebase from 'firebase'
import * as auth from '@firebase/auth';
import * as firestore from '@firebase/firestore';

var user = undefined;
var userdata = undefined;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class WaymakerFirebase {

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
        }
    }

    CreateAccountWithEmail = (email, password, firstname, lastname, username, category, callback) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (userCredential) => {

            user = userCredential.user;

            firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                Email: email,
                FirstName: firstname,
                LastName: lastname,
                Username: username,
                Category: category,
                FullName: firstname + " " + lastname,
                Posts: [],
                Followers: []
            })
            .then( (docRef) => {
                userdata = docRef.data();

                var cat = 'MissionaryHome';
                cat = category == 'Person' ? 'PersonHome' : cat;
                cat = category == 'Church' ? 'ChurchHome' : cat; 

                callback({
                    result: true,
                    navPath: cat
                });
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
            user = userCredential.user;

            firebase.firestore().collection('users').doc(userCredential.user.uid).get()
            .then( (docRef) => {
                userdata = docRef.data();

                var cat = `${userdata.Category}Home`;

                callback({
                    result: true,
                    navPath: cat
                });
            })
        })
        .catch( (error) => {
            console.error(error);
            callback({
                result: false,
                navPath: ''
            });
        })
    }

    Logout = (callback) => {
        callback(true);
    }

    AddMissionaryPost = (title, description, callback) => {

        const d = new Date()
        firebase.firestore().collection('posts').add({
            Title: title,
            Description: description,
            UserId: user.uid,
            UserFullName: userdata.FullName,
            PostDate: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        })
        .then( (docRef) => {

            firebase.firestore().collection('users').doc(user.uid).update({
                Posts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
            .then( (docRef2) => {
                console.log("Success post added");
                callback(true);
            })
            .catch( (error) => {
                console.error(error);
                callback(false);
            });
        })
        .catch( (error) => {
            callback(false);
        }); // ERROR WHEN DELETING AND THEN MAKING ANOTHER ADDS THE OLD DELETED ONE BACK INTO THE MIX
    }

    GetPostById = (id, callback) => {

        firebase.firestore().collection('posts').doc(id).get()
        .then( (docRef) => {
            var data = docRef.data();
            callback({
                title: data.Title,
                description: data.Description,
                name: data.UserFullName,
                postDate: data.PostDate
            });
        })
    }

    GetPostIds = (callback) => {

        firebase.firestore().collection('users').doc(user.uid).get()
        .then( (docRef) => {
            callback(docRef.data().Posts);
        }) 
    }

    GetPostsOfFollowers = (callback) => {

        if (userdata == undefined) { callback([]); return; }

        if (userdata.Followers.length > 0) {
            firebase.firestore().collection('posts').where('UserId', 'in', userdata.Followers)
            .get()
            .then( (querySnapshot) => {
                var tempList = []
                querySnapshot.forEach( (doc) => {
                    tempList.push(doc.id);
                })
                callback(tempList);
            })
        } else {
            callback([]);
        }
    }

    GetUserCategory = () => {
        return userdata.Category;
    }

    RemovePostById = (postId, callback) => {

        firebase.firestore().collection('posts').doc(postId).delete().then( () => {
            
            firebase.firestore().collection('users').doc(user.uid).update( {
                Posts: firebase.firestore.FieldValue.arrayRemove(postId)
            })
            .then ( () => {
                callback(true)
            })
            .catch ( (error) => {
                callback(false)
            })

        }).catch( (error) => {
            callback(false);
        })
    }

    GetMissionUsers = (nameCriteria, callback) => {

        firebase.firestore().collection('users')
            .where('Category', '==', 'Missionary')
            .get()
            .then( (querySnapshot) => {

                console.log('Success Search')
                var missionUsers = []
                querySnapshot.forEach( (doc) => {

                    const un = doc.data().Username

                    if (un.includes(nameCriteria)) {
                        missionUsers.push(doc.data().Username)
                    }
                })

                callback(missionUsers)
            })
            .catch( (error) => {
                console.log('Unsuccessful search')
                callback([])
            })
    }

    FollowUser(followee) {

        firebase.firestore().collection('users')
            .where('Username', '==', followee)
            .get()
            .then( (querySnapshot) => {

                querySnapshot.forEach( (doc) => {

                    var uid = doc.id;

                    firebase.firestore().collection('users').doc(user.uid).update( {
                        Followers: firebase.firestore.FieldValue.arrayUnion(uid)
                    })
                    .then( () => {
                        console.log('Follow Successful')
                    })
                    .catch ( (error) => {
                        console.log('Follow Unsuccessful 2')
                    })
                })
            })
            .catch ( (error) => {
                console.log('Follow Unsuccessful 1: ' + error)
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