// // rfac
// import React, { useContext } from 'react'
// import {signOut} from 'firebase/auth'
// import {auth} from '../firebase'
// import { AuthContext } from '../Context/AuthContext'
// const Navbar = () => {
//   const {currentUser}=useContext(AuthContext)
//   return (
//     <div className='navbar'>
//       <span className='logo'>WA Chat</span>
//       <div className='user'>
// <img src={currentUser.photoURL} alt=''/>
// <span>{currentUser.name}</span>
// <button onClick={()=>signOut(auth)}>logout</button>
//       </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  // Check if currentUser is available before accessing its properties
  if (!currentUser) {
    // You may choose to render a loading state or redirect the user to the login page
    return <div>Loading...</div>;
  }

  return (
    <div className='navbar'>
      <span className='logo'>WA Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;