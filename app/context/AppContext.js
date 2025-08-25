'use client'; 
import { createContext, useContext, useState,useEffect } from 'react';
import { auth } from '../firebase';
import {signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'


const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); 


  const value = {
    user,setUser,
    logout,
  }
// AUTH HANDLERS
useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, email, uid } = firebaseUser;
        const newUser = { displayName, email, uid };
        setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
    return () => unsub();
}, []);
  
  // שלב 1: טעינה מ-localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

    function logout() {
  // setUserDataObj(null)
      return signOut(auth)
      console.log('logoutttt')
    }


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}



