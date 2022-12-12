import React, { useState } from 'react'

import Contacts from './Contacts'
import Friends from './Friends'
import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
  const [showFriendsOrChats, setShowFriendsOrChats] = useState("chats")
  return (
    
    <div className="sidebar-container">
        <Search />
        <div className="friendschatscontainer">
          <div className={showFriendsOrChats === "friends" ? "friendsOn" : "friends"}><span onClick={() => setShowFriendsOrChats("friends")}className="friendspan">Friends</span></div>
          <div className={showFriendsOrChats === "chats" ? "chatsidebarOn" : "chatsidebar"}><span onClick={() => setShowFriendsOrChats("chats")} className="chatspan">Chats</span></div>
        </div>
        {showFriendsOrChats === "chats" &&
          <Contacts />
        }
        {
          showFriendsOrChats === "friends" &&
          <Friends />
        }
        
        
        
    </div>
   
  )
}

export default Sidebar