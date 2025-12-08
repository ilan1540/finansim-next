'use client';
//import { useState,useEffect } from 'react';
import { auth } from '../firebase';
import { useAppContext } from '../context/AppContext';

export const Footer = () => {
  const {user} = useAppContext()
  //const user = auth.currentUser
  // console.log(user)
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <footer className="bg-white p-1 rounded-3 gap-4 text-black  text-base font-bold flex justify-between   fixed  inset-x-0 bottom-0">
        <p>שם: {user &&  user.displayName}</p>
        
       <p>  &copy; 2024 finansim </p>
       {/* <p>  &copy; 2024 finansim  |  Developed by ilan bar lev </p> */}
          </footer>
    </div>
  )
}
