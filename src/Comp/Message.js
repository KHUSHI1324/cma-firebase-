import React, {useState, useContext,useRef, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { updateDoc,getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
const Message = ({message}) => {
const {currentUser} = useContext(AuthContext)
const {data}= useContext(ChatContext);

const [formattedDate, setFormattedDate] = useState('');
const ref =useRef()

useEffect(()=>{
  ref.current?.scrollIntoView({behavior:"smooth"});

  const updateTimestamp = async () => {
    const messageRef = doc(db, 'chats', data.chatId, 'messages', message.id);
    const messageDoc = await getDoc(messageRef);

    if (messageDoc.exists()) {
      await updateDoc(messageRef, {
        date: serverTimestamp(),
      });
    } else {
      console.error('No document to update:', messageRef.path);
    }
  };

    // Format the date for display
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
    };
    setFormattedDate(message.date.toDate().toLocaleTimeString('en-US', options));

     // Update the timestamp (if it's an old message)
  const isOldMessage = message.date.toDate() < new Date() - 5 * 60;
  if (isOldMessage) {
    updateTimestamp();
  }


},[message,data.chatId]);
  return (
    
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
    <div className='messageInfo'>
        <img src={message.senderId === currentUser.uid 
          ? currentUser.photoURL 
          : data.user.photoURL} alt=''/>
        <span>{formattedDate}</span>
    </div>
    <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt=''/>}
    </div>
    </div>
  );
};

export default Message;