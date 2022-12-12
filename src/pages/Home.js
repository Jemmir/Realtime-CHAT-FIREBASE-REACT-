import React, { useContext, useEffect, useState } from 'react'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { ChatContext } from '../context/Context'
import { contactos } from '../dummydata/contacts'



const Home = () => {
  const [user, setUser] = useState([])
  const {show, setShow, width, setWidth, userInfo, setUserInfo, ring, setRing} = useContext(ChatContext)
  const [chats, setChats] = useState([])

  
  return (
    <>
    <div onMouseEnter={() => setRing(false)} onMouseLeave={() => setRing(true)} className="form-container">
        <div className="components-container">
            <div className={width > 601 ? (show === true ? "navbarsidebar" : "navbarsidebaroff") : (show === false ? "navbarsidebar" : "navbarsidebaroff")}>
            <Navbar chats={chats} setChats={setChats}/>
            <Sidebar  user={user} setUser={setUser} contactos={contactos}/>
            </div>
            
            <Chat chats={chats} setChats={setChats} user={user} setUser={setUser} contactos={contactos}/>
        </div>
        
    </div>
    
    </>
  )
}

export default Home