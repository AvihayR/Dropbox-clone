import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDr1zJHnPb7QLEnpQ-ROaETAqAeyneoLo4",
    authDomain: "dropbox-clone-eb470.firebaseapp.com",
    projectId: "dropbox-clone-eb470",
    storageBucket: "dropbox-clone-eb470.appspot.com",
    messagingSenderId: "347010880425",
    appId: "1:347010880425:web:f484a7ad3c222959dfeab8"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }