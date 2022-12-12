// import React, { useRef } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth, db, registerNewUser, storage } from '../firebase/firebase';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { doc, setDoc } from 'firebase/firestore';

import React, { useState } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [infoError, setInfoError] = useState("")

  function onlyLetters(str) {
    return /^[a-zA-Z\s.,]+$/.test(str);
  }
  const handleSubmit = async(e) => {
  e.preventDefault()
  const displayName = e.target[0].value
  const email = e.target[1].value
  const password = e.target[2].value;

  if(onlyLetters(displayName)){
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
      const date = new Date().getTime();
      const storageRef = ref(storage, user.uid);
          
            //Update profile
            await updateProfile(user, {
              displayName: displayName.toLowerCase(),
              
            });
            //create user on firestore
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: displayName.toLowerCase(),
              email,
              photoURL: "",
            });
            
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", user.uid), {});
            await setDoc(doc(db, "friends", user.uid), {});
            navigate("/")
          ;
      } catch (error) {
        if(error.message === "Firebase: Error (auth/email-already-in-use)."){
          alert("Este correo ya se encuentra utilizado")
      }else if(error.message === "Firebase: Error (auth/invalid-email)."){
          alert("Escribe un correo electrónico valido")
          
      }else if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
         alert("La contraseña debe ser de al menos 6 caracteres")
         
      }      
      
        
      }
  }else{
    setInfoError("Only letters can be written as name")
  }


  
  }


  

  return (
    <div className="form-container">
        <div className="form-wrapper">
            <span className="logo">Weizo Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input placeholder="Introduce a display name" type="text" name="display-name" />
                {infoError !== "" && 
                <div style={{textAlign:"center", backgroundColor:"red"}}>{infoError}</div>
                }
                <input  placeholder="Introduce an email"  type="email" name="email" />
                <input placeholder="Introduce a password"   type="password" name="password" />
               
              
                <button className="logsign">Sign Up</button>
            </form>
            <p className="login-p">Already have an account?. <Link to="/login">Log In</Link> </p>
        </div>
    </div>
  )
}

export default Register