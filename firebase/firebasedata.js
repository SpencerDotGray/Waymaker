import { firebase }  from './config'

const fb = firebase.default;

const getPostsBy = (authors, callback) => {

    authors.forEach(author => {

        fb.firestore().collection('users').doc(author).get().then( doc => {

            doc.data().posts.forEach( post => {
                callback(post.id);
            })
        })
    });
}

const getPostData = (postId, callback) => {

    fb.firestore().collection('posts').doc(postId).get().then( doc => {

        callback(doc.data());
    })
}


export { getPostsBy, getPostData };