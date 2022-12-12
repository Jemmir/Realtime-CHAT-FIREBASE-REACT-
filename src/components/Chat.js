import React, { useContext, useEffect, useState } from 'react'
import Chats from './Chats'
import Input from './Input'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { ChatContext } from '../context/Context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FamilyRestroomOutlined } from '@mui/icons-material';

const Chat = ({chats, setChats}) => {
  const {data,  show, setShow, setWidth, width, userInfo} = useContext(ChatContext)
  const [showBiggerImage, setShowBiggerImage] = useState(false)
  const [img, setImg] = useState("")
  const [showFriend, setShowFriend] = useState(false)
  

 useEffect(() => {
  if(window.innerWidth < 600){
    setShow(false)
    setWidth(window.innerWidth)
  }else if(window.innerWidth > 500){
    setShow(true)
  }
 
 },[])


 
 const handleClick = async() => {
  let fecha = new Date()
    let fecho = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes()
  await updateDoc(doc(db, "friends", userInfo.uid), {
    friendList: arrayUnion({
      uid: data.user.uid,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
      date: fecho
    }),
  })
  await updateDoc(doc(db, "userChats", userInfo.uid), {
    [data.chatId + ".friend"]: "yes"
    
    
  });
 
  setShowFriend(true)
 }
  
  return (
    <div className={show ? "chat-container" : "chat-containeroff"}>
      <div className="user">
        <div className="chatusername">
          {
            width < 600 &&
          <span onClick={() => setShow(!show)}><ArrowBackIcon /></span>
          }
          <span style={{textTransform:"capitalize"}}>{data.user.displayName }</span>
        </div>
        {data.friend === "no" && showFriend === false &&
        <div className="chaticons">
          <span style={{cursor: "pointer", marginRight:10}}onClick={handleClick}><PersonAddIcon /></span>
       
        </div>
        }
        
     
      </div>
      <div className="chats">

        <Chats  img={img} setImg={setImg} showBiggerImage={showBiggerImage} setShowBiggerImage={setShowBiggerImage} chats={chats} setChats={setChats}/>
        
        
      </div>
      <div className="input">

        <Input />
      </div>
      {showBiggerImage &&
      <div onClick={() => setShowBiggerImage(!showBiggerImage)}className="biggerimagecontainer">
        <div onClick={(e) => e.stopPropagation()} className={width < 600 ? "biggerimagephone" : "biggerimage"}>
          <img className="imagentamañoreal" src={img} />
        </div>
      </div>
      }
      
    </div>
  )
}

export default Chat