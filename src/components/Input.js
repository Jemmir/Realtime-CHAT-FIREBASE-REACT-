import React, { useContext, useEffect, useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { addDoc, arrayUnion, doc, increment, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import { ChatContext } from '../context/Context';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Input = () => {

  const [file, setFile] = useState(null)
  const [text, setText] = useState("")
  const [porcentaje, setPorcentaje] = useState(0)
  const [imgURL, setImgURL] = useState("")
  const [textRespaldo, setTextRespaldo] = useState("")
  const {userInfo, data} = useContext(ChatContext)

  const handleKey = (e) => {
    if(e.code === "Enter" && file === null){
      if(porcentaje === 0){
          handleSend()
      }else if(porcentaje === 100 & imgURL !== ""){
        handleSend()
      }

    }
  }

  useEffect(() => {
    if(file){
      let numero = Math.random()*1000
      let numeroString = numero.toString()

      const storageRef = ref(storage, numeroString);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPorcentaje(progress)
          
        }, 
        (error) => {
       
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
          setImgURL(downloadURL)                      
          });
          
        }
      );   
      setFile(null)
      }
          
  },[file])
  const handleSend = async() => {
    let fecha = new Date()
    let fecho = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes()
    
if(imgURL !== ""){
  await updateDoc(doc(db, "chats", data.chatId), {
    messages: arrayUnion({
      id: Math.random()*1000,
      text,
      senderId: userInfo.uid,
      date: fecho,
      img: imgURL
    }),
  });
    setImgURL("")
    setText("")
    setPorcentaje(0)
}else{
  await updateDoc(doc(db, "chats", data.chatId), {
    messages: arrayUnion({
      id: Math.random()*1000,
      text,
      senderId: userInfo.uid,
      date: fecho
    }),
  });
  
    setText("")
    
}
await updateDoc(doc(db, "userChats", userInfo.uid),{
  [data.chatId + ".lastMessage"]: textRespaldo, 
  [data.chatId + ".senderId"]: userInfo.uid,
  [data.chatId + ".date"]: serverTimestamp(),
  
  

})
await updateDoc(doc(db, "userChats", data.user.uid),{
  [data.chatId + ".lastMessage"]: textRespaldo, 
  [data.chatId + ".senderId"]: userInfo.uid,
  [data.chatId + ".date"]: serverTimestamp(),
  [data.chatId + ".value"]: increment(1),

})
      
    
    setTextRespaldo("")
    
  }
  if(Object.keys(data.user).length === 0){
    return
  } else  return (
    <div className="inputflex">
      <div className="inputtextinput">
        <input onKeyDown={handleKey}  onChange={(e) => {
          setText(e.target.value)
          setTextRespaldo(e.target.value)}} value={text} className="realinputtext" type="text" placeholder="Write a message" />
        
      </div>  
      <div className="iconsendbutton">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" style={{display:"none"}} id="filehidden"/>
        {porcentaje === 0 &&
        <label className="inputlabel" htmlFor='filehidden'><span>
          <UploadIcon />
        </span></label>
        }
        {imgURL !== "" && 
        <img  className="inputimg" src={imgURL} />}
        {porcentaje > 1 &&
        <div className="porcentaje"><span>{porcentaje.toFixed(2)}%</span></div>
        }
        
       
        <button className="sendbutton" disabled={porcentaje !== 0 ? imgURL === "" : false}onClick={handleSend}>SEND</button>
      </div>
    </div>
  )
}

export default Input