'use client'; 
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { sortByField } from './globalFunc';
import { auth,db } from '../firebase';
import { collection, query ,onSnapshot } from "firebase/firestore";
import {signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import moment from 'moment';
import { useRouter } from 'next/navigation';
//import { set } from 'react-hook-form';



const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [gemel, setGemel] = useState(null)
  const [data, setData] = useState([]);
  const [bank, setBank] = useState([]);
  const [loadingBank, setLoadingBank] = useState(false);
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [year, setYear] = useState(moment().year())
  const [csvFile, setCsvFile] = useState('לא נבחר קובץ')
  const [message, setMessage,] =useState(null)
const router = useRouter();

  
// AUTH HANDLERS
useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, email, uid,photoURL } = firebaseUser;
        const newUser = { displayName, email, uid,photoURL };
        setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
    return () => unsub();
}, []);
  
  /* קריאה BANK מ־Firestore */
useEffect(() => {
  const q = query(
    collection(db, "bank"),
  //  orderBy("date", "desc")
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.() || null   
    }));
    const sortedData = sortByField(data, "date", "desc");
    setBank(sortedData);
    setLoadingBank(false);
  });

  return () => unsub();
}, []);


   /* פילטר לפי שנה */
  const filteredBank = useMemo(() => {

    if (selectedYear === "ALL") return bank;

    return bank.filter(row => {
      if (!row.date) return false;
      return new Date(row.date).getFullYear().toString() === selectedYear;
    });

  }, [bank, selectedYear]);




  
  // שלב 1: טעינה מ-localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
 async function  logout()    {
  try {
    await signOut(auth);
    localStorage.removeItem('user'); // אם השתמשת ב-localStorage
    setUser(null);
    router.push('/'); // Redirect to home page
  //  router.push('/login'); // להפנות לדף התחברות
  } catch (err) {
    console.error('שגיאה בהתנתקות:', err);
  }
  };
// עדכון שורה ב-BANK וחזרה לדף ראשי
  const updateBankRow = (id, updatedFields) => {
  setBank(prev =>
    prev.map(row =>
      row.id === id ? { ...row, ...updatedFields } : row
    )
  );
};

  const value = {
    user,setUser,
    logout,
    gemel,setGemel,  
    data,setData,   
    year, setYear,
     setBank,
    bank: filteredBank,
   updateBankRow,
    loadingBank, setLoadingBank,
    selectedYear, setSelectedYear,
    csvFile, setCsvFile,
    message, setMessage,
  }
//console.log('AppContext user:', bank  );
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}



