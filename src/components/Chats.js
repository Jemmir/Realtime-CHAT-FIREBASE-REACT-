import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/Context'
import { db } from '../firebase/firebase'
import ComputerIcon from '@mui/icons-material/Computer';
import CopyrightIcon from '@mui/icons-material/Copyright';
import useSound from 'use-sound';

import Pew from "../assets/Pew.mp3"



const Chats = ({img, setImg, chats, showBiggerImage, setShowBiggerImage, setChats}) => {
  const {userInfo, data, dispatch, noLeidos, setNoLeidos, ring, setRing} = useContext(ChatContext)
 

  
  
    

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
   
  },[chats])

  const play = () => {
    new Audio(Pew).play()
  }

  // useEffect(() => {
  //   if(chats.length > 0){
  //     if(chats.filter((i,index,array) => index === array.length - 1)[0].senderId !== userInfo.uid && ring === true){
  //       play()
        
  //     }
  //   }
    
  // },[chats])

  
  useEffect(() => {
    
    if(data.chatId !== null){
     const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
       doc.exists() && setChats(doc.data().messages)})
      
       return () => {
         unsub()
       }
    }                 
    
   },[data])
   
   if(Object.keys(data.user).length === 0){
    return (
    <div style={{height: "100%" , display:"flex", justifyContent:"center", alignItems:"center", alignContent:"center", fontSize:20, }}>
      <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", flexDirection:"column", textAlign:"center", fontWeight:"bold"}}>
        <p>Online chat that works on the web. Completely responsive. Made with React and Firebase</p>
        <span style={{marginTop: 10}}><ComputerIcon fontSize='large' /></span>
        </div>
        <div style={{display:"flex", gap:"3px", alignItems:"center", justifyContent:"center", marginTop:30}}>
        <span style={{fontSize:"12px", fontWeight:"bold"}}>Copyright JAVIER MARIÑO </span> 
        <span><CopyrightIcon color="black" fontSize="small"/></span>
       
        </div>
        
      </div>
      
    </div>
    )
   }else return (
    <>
      {
        chats.map((messages) => (
          <>
          <div key={messages.id} onWheel={(e) => {if(e.deltaY > 0){
            setNoLeidos(0)
          }}} ref={ref}  className={messages.senderId === userInfo.uid ? "chatcontentimgowner" : "chatcontentimg"}>
          <div className={messages.senderId === userInfo.uid ? "owner" : "message"}>
          <div className="messageInfo">
            <img className="profilephoto2" src={messages.senderId === userInfo.uid ?  userInfo.photoURL : data.user.photoURL} />
          
            <span style={{color:"black"}}>{messages.date}</span>
          </div>
          
          <div  className={messages.senderId === userInfo.uid ? "messageContentOwner": "messageContent"}>
          {messages.text}
             
          </div>
                 
          </div>
          {messages.img && 
          <img onClick={() => {
            setShowBiggerImage(!showBiggerImage)
            setImg(messages.img)
            }}className={messages.senderId === userInfo.uid ? "chatimgowner" : "chatimg"} src={messages.img}/>}
         
         
            
          </div>
          
          </>
        ))
      }
       
    </>
    
  )
}

export default Chats