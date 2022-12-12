import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { ChatContext, useChat } from "../context/Context"


export const HomeMiddleware = ({children}) => {
    const {userInfo} = useContext(ChatContext)
    if(userInfo === null){
        return <Navigate to="/login" />
    }else return children
}

export const LoginRegisterMiddleware = ({children}) => {
    const {userInfo} = useContext(ChatContext)
    if(userInfo !== null){
        return <Navigate to="/" />
    }else return children
}