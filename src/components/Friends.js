import React, { useContext, useEffect, useState } from 'react'

import { ChatContext } from '../context/Context';
import { db, getFriends } from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

const Friends = () => {
    const [friends, setFriends] = useState([])
    
    const {userInfo, data, dispatch, show, setShow, setWidth, width} = useContext(ChatContext)
    
  
    useEffect(() => {
  
     if(userInfo.uid){
      
       
        
        const getFriendos = async() => {
          try {
            const res = await getFriends(userInfo.uid)
            setFriends(res)
          } catch (error) {
           
          }
           
    };
      
    getFriendos()
     }                 
     
    },[userInfo])
  
    
  return (
    <div className="contacts-container">
      {friends && Object.values(friends).sort().map((friends) => (
        <div className="contacts" key={friends.id} onClick={()=> dispatch({type:"CHANGE_USER", payload:friends})}>
          <img className="profilephoto"src={friends.photoURL}/>
          <div className="contacts+message">
          <p className="name">{friends.displayName}</p>
          
          
          </div>
        </div>
        
      ))}
        
    </div>
  )
}

export default Friends