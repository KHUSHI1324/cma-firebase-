import React from 'react'
import Cam from '../image/cam.png'
import Add from '../image/adds.png'
import More from '../image/More.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../Context/ChatContext'
import { useContext } from 'react'
const MyChat = () => {
  const {data} =useContext(ChatContext);
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={Cam} alt=''/>
          <img src={Add} alt=''/>
          <img src={More} alt=''/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  );
};

export default MyChat;
