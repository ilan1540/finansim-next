'use client';
//import { useEffect } from 'react';
//import { signInWithPopup } from 'firebase/auth';
import { auth,googleProvider } from '../firebase';
import { useAppContext } from '../context/AppContext';

export default function GoogleLoginButton({ btnName }) {
  const { googleSignIn } = useAppContext()
  
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <button
      onClick={handleGoogleSignIn}
      className="font-bold text-black hover:text-blue-700  transition"
    >{btnName}</button>
    
)

}
