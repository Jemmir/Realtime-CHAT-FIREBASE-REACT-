import { connectStorageEmulator } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'

import {getFirestore, collection, addDoc, getDocs, doc, getDoc, query, setDoc, deleteDoc, where, updateDoc, serverTimestamp} from "firebase/firestore"
import { chatExists, db, getChats } from '../firebase/firebase'
import { ChatContext } from '../context/Context'


const Search = () => {
  const [username, setUsername] = useState("")
  const [key, setKey] = useState("")
  const [otherUserInfo, setOtherUserInfo] = useState(null)
  const {userInfo} = useContext(ChatContext)
  

  const getUserByUsername = async (name) => {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("displayName", "==", name));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        setOtherUserInfo(doc.data())
    });
}
  useEffect(() => {
    if(username === ""){
      setOtherUserInfo(null)
    }
  },[username])
  
  useEffect(() => {
    if(key === "Enter"){
      const searchForUser = async() => {
        const res = await getUserByUsername(username)
       
      }
      searchForUser()
    }
  },[key])
 
  const handleSelect = async() => {
    const combinedId =
      userInfo.uid > otherUserInfo.uid
        ? userInfo.uid + otherUserInfo.uid
        : otherUserInfo.uid + userInfo.uid
    
   
      try {
        
        const res = await chatExists(combinedId)
     
  
        if (!res) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          await updateDoc(doc(db, "userChats", userInfo.uid), {
            [combinedId + ".friend"]: "no",
            [combinedId + ".value"]: 0,
            [combinedId + ".userInfo"]: {
              uid: otherUserInfo.uid,
              displayName: otherUserInfo.displayName,
              photoURL: otherUserInfo.photoURL,
              uids:combinedId,
              

           
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "userChats", otherUserInfo.uid), {
            [combinedId + ".friend"]: "no",
            [combinedId + ".value"]: 0,
            [combinedId + ".userInfo"]: {
              uid: userInfo.uid,
              displayName: userInfo.displayName,
              photoURL: userInfo.photoURL,
              uids:combinedId,
             
              
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}
  
      setOtherUserInfo(null)
    

    }
  

  return (
       
    <div className="search">
      <div className="searchForm">
       <input type="text" onChange={(e) => setUsername(e.target.value.toLowerCase())} onKeyDown={(e) =>      
          setKey(e.code)} className="searchtext" placeholder="Search for any contact" />
        
        
      
        
      </div>
      {otherUserInfo !== null && 

      <div className="userChat" onClick={handleSelect} >
        <img className="profilephoto" src={otherUserInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span className="capitalize">{otherUserInfo.displayName}</span>
        </div>
      </div>
      }
      
  
  </div>
  )
}

export default Search