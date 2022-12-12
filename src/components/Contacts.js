import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ChatContext } from '../context/Context';
import { db } from '../firebase/firebase';
import useSound from 'use-sound';

import Pew from "../assets/Pew.mp3"



const Contacts = ({item, user, setUser}) => {

  const [chats, setChats] = useState([])
  const {userInfo, data, dispatch, show, setShow, setWidth, width, noLeidos, setNoLeidos, ring} = useContext(ChatContext)
 
  const play = () => {
    new Audio(Pew).play()
  }

  useEffect(() => {
    
    if(data.chatId !== "null" && ring === false){
     const actualizarValue = async () => {
      await updateDoc(doc(db, "userChats", userInfo.uid),{
        [data.chatId + ".value"]: 0,
      })
      document.title= `${Object.values(chats).filter(i => i.value > 0).length > 0 ? `(${Object.values(chats).filter(i => i.value > 0).length})` : ""}Messenger`
     }
      actualizarValue()
    }
     
   
  },[data, ring])

  useEffect(() => {
    if(Object.keys(chats).length > 0){
      if(Object.values(chats).sort((a,b) => b.date - a.date).filter(i => i.value !== undefined ? i.value > 0 : true)[0]){
        if(Object.values(chats).sort((a,b) => b.date - a.date).filter(i => i.value !== undefined ? i.value > 0 : true)[0].value > 0 && ring === true){
            play()
            document.title= `(${Object.values(chats).filter(i => i.value > 0).length}) Messenger`
           
        }
      }
        
    }
    
  },[chats])

  useEffect(() => {

   if(userInfo.uid){
    const unsub = onSnapshot(doc(db, "userChats", userInfo.uid), (doc) => {
      
      setChats(doc.data())
      })
     
      return () => {
        unsub()
      }
   }                 
   
  },[userInfo])

  
  const handleClick = async(u, f) => {
    dispatch({type:"CHANGE_USER", payload: u, friend: f})
    
    
    if(width < 601){
      setShow(!show)
    }
    
    
  }

  return (
    <div className="contacts-container">
      {chats && Object.values(chats).sort((a,b) => b.date - a.date).map((chats) => (
        <>
        <div className="contacts" key={chats.userInfo.uid} onClick={() => handleClick(chats.userInfo, chats.friend)}>
          <img className="profilephoto"src={chats.userInfo.photoURL !== "" ? chats.userInfo.photoURL : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"}/>
          <div className="contacts+message">
          <p className="name">{chats.userInfo.displayName}</p>
          {chats.lastMessage && 
          <p className="messageSidebar">{chats.senderId === userInfo.uid ? (chats.lastMessage.length > 26 ? "me: " + chats.lastMessage.substring(0,26) + "...": "me: " + chats.lastMessage) : (chats.lastMessage.length > 26 ? chats.lastMessage.substring(0,26) + "..." : chats.lastMessage)}</p>
          }
          
          </div>
          <div style={{textAlign:"center", width:35, backgroundColor: "green", borderRadius: 10}}>
          {chats.value !== 0 ? chats.value : null}
          </div>  
        </div>
        
        </>
      ))}
        
    </div>
  )
}

export default Contacts