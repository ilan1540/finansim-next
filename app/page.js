'use client';
import { useEffect } from 'react';

import LoginButton from './components/LoginButton';

export default function Home() {
   useEffect(() => {
    const onMessage = (e) => {
 {
      //  console.log('✅ Logged in user:', e.data.user);
        // אפשר לעדכן context או לבצע redirect
      }
    };
     window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);

    
  },[])

  return (
    <div className="flex flex-col justify-items-center min-h-max ">
      
      <main className="flex-grow p-4">
        main 
        
        <LoginButton />
      </main>
      
    </div>
  );
}
