import { onAuthStateChanged } from "firebase/auth";
import { createContext,  useEffect, useReducer, useState } from "react";
import { auth, getUserInfo } from "../firebase/firebase";

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null)
    const [show, setShow] = useState(true)
    const [width, setWidth] = useState(1000)
    const [showFriend, setShowFriend] = useState(false)
    const [noLeidos, setNoLeidos] = useState(0)
    const [ring, setRing] = useState(false)
    useEffect(() => {
        const user = onAuthStateChanged(auth, (user) => {
            console.log(user)
            setUserInfo(user)
            
        });
       
    },[userInfo])

    
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
      };
    
      const chatReducer = (state, action) => {
        switch (action.type) {
          case "CHANGE_USER":
            return {
              user: action.payload,
              friend: action.friend,
              chatId:
                userInfo.uid > action.payload.uid
                  ?  userInfo.uid + action.payload.uid
                  : action.payload.uid +  userInfo.uid,
            };
          case "LOG_OUT":
            return {
              chatId: "null",
              user: {}
            }
          default:
            return state;
        }
      };
    
      const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
   
    return(
        <ChatContext.Provider value={{
            userInfo,
            data:state,
            dispatch,
            show, 
            setShow,
            width,
            setWidth,
            showFriend, 
            setShowFriend,
            noLeidos,
            setNoLeidos,
            ring,
             setRing
          
           
           
            
        }}>
            {children}
        </ChatContext.Provider>
    )
    
}

