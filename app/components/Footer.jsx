'use client';
//import { useState,useEffect } from 'react';
import { auth } from '../firebase';
import { useAppContext } from '../context/AppContext';

export const Footer = () => {
  const {user} = useAppContext()
  //const user = auth.currentUser
 // console.log(user)
  
  return (
    <div>
      <footer  className="bg-gray-300 font-black text-2xl p-2 text-center fixed
             inset-x-0
             bottom-0">
        footer user is {user &&  user.displayName
}
          </footer>
    </div>
  )
}
