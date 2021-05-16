import firebase from 'firebase'
import firestore from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAAP2PfdQtnu0-hHLtxLVOdVxly7sRUhaQ",
    authDomain: "assignmentproject-32f81.firebaseapp.com",
    databaseURL: "",
    projectId: "assignmentproject-32f81",
    appId: "1:1061959523671:android:9a62f185d2c90491bcf212",
		storage_bucket: "assignmentproject-32f81.appspot.com"
}
const Firebase = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
db.settings({
	timestampsInSnapshots: true
})

export default Firebase
