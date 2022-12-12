
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChatContext } from '../context/Context'
import { auth, db, logOut, provider, registerNewUser, userExists } from '../firebase/firebase'
import GoogleIcon from '@mui/icons-material/Google';
import { doc, setDoc } from 'firebase/firestore'

const Login = () => {
  const {userInfo, data, dispatch, setShowFriend,} = useContext(ChatContext)
  const navigate = useNavigate()
  const handleClick = async () => {
    try { 
      const result = await signInWithGoogle(provider)
     
    } catch (error) {
      console.log(error)
    }
           
}

const handleLogin = async(e) => {
  e.preventDefault()
  const email = e.target[0].value
  const password = e.target[1].value
  dispatch({type: "LOG_OUT"})
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
  }
  
        
            

            
}

const signInWithGoogle = async (googleProvider) => {
    try {
        
        const result = await signInWithPopup(auth, googleProvider)
        const {displayName, email, localId, photoUrl} = result._tokenResponse
        const nombre = displayName.toLowerCase()
        const resultado = await userExists(localId)
        console.log(result._tokenResponse)
        setShowFriend(false)
        if (resultado === true){
          dispatch({type: "LOG_OUT"})
          navigate("/")
          
        } else if(resultado !== true){
          await registerNewUser({
            uid: localId,
            displayName: nombre,
            photoURL: photoUrl,
            email: email})
          await setDoc(doc(db, "friends", localId), {});
          navigate("/")
        }
       
       
        
    } catch (error) {
       console.log(error)
    }
}
  return (
    <div className="form-container">
        <div className="form-wrapper">
            <span className="logo">Weizo Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleLogin}>
                
                <input  placeholder="Introduce an email"  type="email" name="email" />
                <input placeholder="Introduce a password"   type="password" name="password" />
            
                
            
                <button type="submit" className="logsign">Log In</button>
            </form>
            <p  className="login-p">Are you a new user?. <Link to="/register">Register</Link> </p>
            <span>OR</span>

            <button style={{display:"flex", padding:4, border:"1px solid #DB4437",marginBottom:10, borderRadius:5, fontSize:15, fontWeight:"bold", alignItems:"center", gap:6, background:"#DB4437", color:"white", cursor: "pointer"}} onClick={handleClick}><GoogleIcon fontSize="small" /> Log In with Google</button>
            
        </div>
    </div>
  )
}

export default Login