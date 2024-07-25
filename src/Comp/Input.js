import React,{useState, ref,storage,getDownloadURL,useContext} from 'react'
import Img from '../image/img.png'
import Attach from '../image/attach.png'
import { updateDoc,doc,arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase';
import {v4 as uuid} from 'uuid';
import { uploadBytesResumable } from 'firebase/storage';

import { ChatContext } from '../Context/ChatContext';
import { AuthContext } from '../Context/AuthContext'
const Input = () => {
  const [text,setText]=useState("");
  const [img,setImg]= useState(null);
  const {currentUser} = useContext(AuthContext);
  const {data}= useContext(ChatContext);
  
  const handleSend= async ()=>{
    if (!data.chatId) {
      // Make sure data.chatId is not null before proceeding
      console.error('Chat ID is null.');
      return;
    }
 if(img){
const storageRef = ref(storage,uuid());
const uploadTask = uploadBytesResumable(storageRef, img);

uploadTask.on(
  (error) => {
  //  setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateDoc(doc(db,'chats',data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
        date: Timestamp.now(),
        img: downloadURL,
        }),
      })
    });
  }
);
 }else{
  await updateDoc(doc(db,'chats',data.chatId),{
    messages:arrayUnion({
      id:uuid(),
      text,
      senderId:currentUser.uid,
    date: Timestamp.now(),
    }),
  });
 }

 await updateDoc(doc(db,'userChats',currentUser.uid),{
  [data.chatId + '.lastMessage']:{
    text,
  },
  [data.chatId + '.date']: serverTimestamp(),
 });

 await updateDoc(doc(db,'userChats',data.user.uid),{
  [data.chatId + '.lastMessage']:{
    text,
  },
  [data.chatId + '.date']: serverTimestamp(),
 });

 setText('')
 setImg(null)
};

  return (
    <div className='Input'>
        <input type='text' placeholder='Type msg...' onChange={e=>setText(e.target.value)}
        value={text}/>
      <div className='send'>
        <img src={Attach} alt=''/>
        <input type='file' style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
            <img src={Img} alt=''/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
};

export default Input;
