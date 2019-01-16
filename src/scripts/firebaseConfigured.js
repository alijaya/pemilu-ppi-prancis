import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBoTMWw06V6U8XiDVgBwJF3FGKmEhgsehM",
  authDomain: "genial-smoke-228621.firebaseapp.com",
  databaseURL: "https://genial-smoke-228621.firebaseio.com",
  projectId: "genial-smoke-228621",
  storageBucket: "genial-smoke-228621.appspot.com",
  messagingSenderId: "384931465912"
}

firebase.initializeApp(config)

// to hide error
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase