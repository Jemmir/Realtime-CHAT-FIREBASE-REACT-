
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {getStorage, ref as refo ,uploadBytes, getDownloadURL} from "firebase/storage"
import {getFirestore, collection, addDoc, getDocs, doc, getDoc, query, setDoc, deleteDoc, where} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, onValue, update} from "firebase/database"





const firebaseConfig = {
  apiKey: "AIzaSyAS9DwHRYEeLtpJqvJNGYkse4HponW1X3U",
  authDomain: "chat-a6127.firebaseapp.com",
  projectId: "chat-a6127",
  storageBucket: "chat-a6127.appspot.com",
  messagingSenderId: "160087895890",
  appId: "1:160087895890:web:26ec38df14da2f9abe948b"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider() 
export const database = getDatabase(app)

export const userExists = async (uid) => {
    const docRef = doc(db, "users", uid)
    const res = await getDoc(docRef)
    
    return res.exists()  
}

export const chatExists = async(uid) => {
    const docRef = doc(db, "userChats", uid)
    const res = await getDoc(docRef)
    
    return res.exists()  
}

export const getChats = async(uid) => {
    const docRef = doc(db, "userChats", uid)
    const res = await getDoc(docRef)
    
    return res.data() 
}

export const getFriends = async(uid) => {
    const docRef = doc(db, "friends", uid)
    const res = await getDoc(docRef)
    if(res.exists()) return res.data().friendList
}
export const registerNewUser = async(user) => {
    try {
        
        await setDoc(doc(db, "users", user.uid), user)
        await setDoc(doc(db, "userChats", user.uid), {})
    } catch (error) {
       
    }
}

export const setUserProfilePhoto = async (uid, file) => {
    try {
        const imageRef = refo(storage, `images/${uid}`)
        const resUpload = await uploadBytes(imageRef, file)
        return resUpload
    } catch (error) {
        
    }
    
}

export const getUserInfo = async(uid) => {
    try {
        const docRef = doc(db, "users", uid)
        const document = await getDoc(docRef)
        return document.data()
    } catch (error) {
        
    }
}

export const getProfilePhoto = async(profilePicture) => {
    try {
        const imageRef = refo(storage, profilePicture)

        const url = await getDownloadURL(imageRef)

        return url
    } catch (error) {
        
    }
}

export const getUserByUsername = async (name) => {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("displayName", "==", name));
    const querySnapshot = await getDocs(q);
    console.log("aloh")
    querySnapshot.forEach((doc) => {
        return doc.data()
    });
}
export const logOut = async() => {
    await auth.signOut()
}